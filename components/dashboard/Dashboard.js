import { isToday } from 'date-fns';
import { makeStyles } from '@material-ui/styles';
import { Flags } from 'react-feature-flags';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import { isDone, mostRecent } from '../../src/app-helper';
import { useAuth } from '../Auth';
import ActivityCategoryTable from '../history/ActivityCategoryTable';
import ActivityInputDialog, { ACTIVITY_TYPES } from '../activityInput/ActivityInputDialog';
import AirtablePropTypes from '../Airtable/PropTypes';
import AssessmentCompleteDialog from './AssessmentCompleteDialog';
import BackgroundHeader from '../BackgroundHeader';
import EmploymentOutlookLauchpad from './EmploymentOutlookLauchpad';
import FirebasePropTypes from '../Firebase/PropTypes';
import ProgressFeed from './ProgressFeed';
import ScaffoldContainer from '../ScaffoldContainer';
import SentimentTracker from './SentimentTracker/SentimentTracker';
import TaskList from './TaskList';
import TimeDistanceParser from '../../src/time-distance-parser';
import UpcomingInterviewDialog from './UpcomingInterviewDialog/UpcomingInterviewDialog';

const TASK_COUNT_LIMIT = 3;
const ROW_GAP = 2;
const COL_GAP = 2;

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  subtitle: {
    display: 'inline-block',
  },
  container: {
    marginTop: theme.spacing(-5),
  },
  grid: {
    display: 'grid',
    marginTop: theme.spacing(4),
    gridGap: theme.spacing(ROW_GAP, COL_GAP),
    gridTemplateAreas: `
      'H'
      'C'
      'L'
      'R'
    `,

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 2fr 1fr',
      gridTemplateAreas: `
        '. H .'
        'L C R'
      `,
    },

    /* All Following CSS exists to support IE 11. Keep in sync with the grid CSS above.
     * Helpful tool: https://autoprefixer.github.io/
     */
    '-ms-grid-rows': `
      auto
      ${theme.spacing(ROW_GAP)}px
      auto
      ${theme.spacing(ROW_GAP)}px
      auto
      ${theme.spacing(ROW_GAP)}px
      auto`,
  },
  gridH: { '-ms-grid-row': 1, '-ms-grid-column': 1, 'grid-area': 'H' },
  gridC: { '-ms-grid-row': 3, '-ms-grid-column': 1, 'grid-area': 'C' },
  gridL: { '-ms-grid-row': 5, '-ms-grid-column': 1, 'grid-area': 'L' },
  gridR: { '-ms-grid-row': 7, '-ms-grid-column': 1, 'grid-area': 'R' },
  [theme.breakpoints.up('md')]: {
    grid: {
      '-ms-grid-columns': `1fr ${theme.spacing(COL_GAP)}px 2fr ${theme.spacing(COL_GAP)}px 1fr`,
      '-ms-grid-rows': `auto ${theme.spacing(ROW_GAP)}px auto`,
    },
    gridH: { '-ms-grid-row': 1, '-ms-grid-column': 3 },
    gridC: { '-ms-grid-row': 3, '-ms-grid-column': 3 },
    gridL: { '-ms-grid-row': 3, '-ms-grid-column': 1 },
    gridR: { '-ms-grid-row': 3, '-ms-grid-column': 5 },
  },
}));

// Whether or not a predicate evaluates to true for the curent user.
function isTrue(predicateId, allPredicates, allQuestionResponses) {
  const predicate = allPredicates.find(_predicate => _predicate.id === predicateId);

  if (!predicate) {
    // TODO: log warning (likely indicates a misconfiguration)
    return undefined;
  }

  const questionId = predicate.fields.Question[0];
  const questionResponse = allQuestionResponses.find(qr => qr.id === questionId);

  if (!questionResponse) {
    // expected if user hasn't answered this predicate's question
    // TODO: log at debug-level
    return null;
  }

  const {
    Name: name,
    'Question Response Type': type,
    'Constant Value': constantValue,
    'Option Value': optionValue,
  } = predicate.fields;
  let responseValue = questionResponse.data().value;
  let predicateValue;

  switch (type) {
    case 'Phone':
    case 'Email':
    case 'Link':
    case 'Text':
    case 'Binary':
      predicateValue = constantValue;
      break;
    case 'Option':
      [predicateValue] = optionValue;
      break;
    case 'Date':
      predicateValue = new TimeDistanceParser(constantValue).parse();
      break;
    case 'Number':
      predicateValue = parseFloat(constantValue);
      responseValue = parseFloat(responseValue);
      break;
    default:
      throw new Error(`Unexpected question response type in predicate "${name}": "${type}"`);
  }

  const { Operator: operator } = predicate.fields;

  switch (operator) {
    case 'TRUE':
      return !!responseValue;
    case 'FALSE':
      return !responseValue;
    case 'is':
      return responseValue === predicateValue;
    case 'is not':
      return responseValue !== predicateValue;
    case '<':
      return responseValue < predicateValue;
    case '>':
      return responseValue > predicateValue;
    case 'contains':
      return new RegExp(predicateValue, 'i').test(responseValue);
    case 'does not contain':
      return !new RegExp(predicateValue, 'i').test(responseValue);
    default:
      throw new Error(`Unexpected predicate operator: ${operator}`);
  }
}

// Whether or not any of a condition's predicates are true for the current user.
function isConditionSatisfied(conditionId, allConditions, allPredicates, allQuestionResponses) {
  const condition = allConditions.find(_condition => _condition.id === conditionId);

  if (!condition) {
    // TODO: log warning (likely indicates a misconfiguration)
    return null;
  }

  // prettier-ignore
  return condition.fields.Predicates
    .map(predicateId => isTrue(predicateId, allPredicates, allQuestionResponses))
    .reduce((a, b) => a && b, true);
}

// Whether or not any of a task's conditions are satisfied by the current user.
function isAnyConditionSatisfied(task, allConditions, allPredicates, allQuestionResponses) {
  // prettier-ignore
  return task.fields.Conditions
    .map(conditionId => isConditionSatisfied(conditionId, allConditions, allPredicates, allQuestionResponses))
    .reduce((a, b) => a || b, false);
}

// Whether or not a task is yet to be completed by the user.
function needsCompletion(task, allTaskDispositionEvents, eventCollections) {
  const { TASK_TRIGGERING_EVENT_TYPES: eventTypes } = AirtablePropTypes;
  const { 'Triggering Event': eventType } = task.fields;
  const { interviewLogEntries } = eventCollections;

  switch (eventType) {
    case undefined:
      // task does not require an event
      return !isDone(task, allTaskDispositionEvents, 'taskId');
    case eventTypes.INTERVIEW_IN_PERSON:
    case eventTypes.INTERVIEW_LIVE_VIDEO:
    case eventTypes.INTERVIEW_RECORDED_VIDEO:
    case eventTypes.INTERVIEW_PHONE_SCREEN:
      // need completion if the latest event is newer than the latest disposition
      return (
        mostRecent(interviewLogEntries.filter(event => event.data().type === eventType)) >
        mostRecent(allTaskDispositionEvents.filter(event => event.data().taskId === task.id))
      );
    default:
      throw new Error(`Unexpected task-triggering event type: ${eventType}`);
  }
}

// Whether or not the current user is a member of the task's audience.
function audienceApplies(task, allConditions, allPredicates, allQuestionResponses) {
  const { Audience: audience } = task.fields;

  switch (audience) {
    case 'Conditions':
      return isAnyConditionSatisfied(task, allConditions, allPredicates, allQuestionResponses);
    case 'Everyone':
      return true;
    default:
      throw new Error(`Unexpected task audience: ${audience}`);
  }
}

// This should return all outstanding tasks that currently apply to a user (capped at the max limit).
function getTasks(_props, limit) {
  const {
    allConditions,
    allPredicates,
    allTasks,
    allTaskDispositionEvents,
    allQuestionResponses,
    interviewLogEntries,
  } = _props;

  // 1. does audience apply?
  // 2. TODO: are prerequisites satisfied?
  // 3. has the task not already been done?
  // 4. TODO: apply frequency?
  // 5. sort
  // 6. limit
  return allTasks
    .filter(task => audienceApplies(task, allConditions, allPredicates, allQuestionResponses))
    .filter(task => needsCompletion(task, allTaskDispositionEvents, { interviewLogEntries }))
    .sort((a, b) => b.fields.Priority - a.fields.Priority)
    .slice(0, limit);
}

const DIALOGS = {
  ACTIVITY_INPUT: 'ActivityInputDialog',
  UPCOMING_INTERVIEW: 'UpcomingInterviewDialog',
  ASSESSMENT_COMPLETE: 'AssessmentCompleteDialog',
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function Dashboard(props) {
  const classes = useStyles();
  const { user, userDocRef } = useAuth();
  const {
    allConditions,
    allPredicates,
    allTasks,
    allQuestionResponses,
    allActions,
    allActionDispositionEvents,
    allTaskDispositionEvents,
    completedTasks,
    confidentActivityLogEntries,
    historyLimit,
    allActivityLogEntries,
    ...restProps
  } = props;

  const tasks = getTasks(props, TASK_COUNT_LIMIT);
  const doneTaskCount = allTaskDispositionEvents.length;
  const [activeDialog, setActiveDialog] = useState();

  const showAssessmentComplete = user.isAssessmentComplete && !user.isAssessmentActivityCreated;

  const isSentimentLoggedToday =
    user.lastSentimentTimestamp && isToday(user.lastSentimentTimestamp.toDate());
  const isSentimentClosedToday =
    user.lastSentimentCloseTimestamp && isToday(user.lastSentimentCloseTimestamp.toDate());

  const showSentiment = !isSentimentLoggedToday || !isSentimentClosedToday;

  const onRecordSentiment = () => {
    userDocRef.set({ lastSentimentTimestamp: new Date() }, { merge: true });
  };

  const onSentimentClose = () => {
    userDocRef.set({ lastSentimentCloseTimestamp: new Date() }, { merge: true });
  };

  useEffect(() => {
    window.Intercom('update', { 'tasks-completed': doneTaskCount });
  }, [doneTaskCount]);

  useEffect(() => {
    if (showAssessmentComplete) {
      setActiveDialog(DIALOGS.ASSESSMENT_COMPLETE);
      const increment = firebase.firestore.FieldValue.increment(1);
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        config: {
          activityTypes: ACTIVITY_TYPES,
        },
        timestamp,
        activityTypeValue: 'assessment-complete',
        activityTypeLabel: 'Completed assessment',
        briefDescription: 'Completed assessment',
        dateCompleted: new Date(),
      };
      const stats = {
        activityLogEntriesCount: increment,
        activityLogEntriesLatestTimestamp: timestamp,
      };

      userDocRef.set({ isAssessmentActivityCreated: true }, { merge: true });

      userDocRef
        .collection('activityLogEntries')
        .add(data)
        .then(() => {
          userDocRef.set({ stats }, { merge: true });
          window.Intercom('update', { 'last-activity-logged': new Date() });
          window.Intercom('trackEvent', 'logged-activity', {
            type: data.activityTypeLabel,
            description: data.briefDescription,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [userDocRef, showAssessmentComplete]);

  return (
    <div className={classes.root}>
      <ActivityInputDialog
        show={activeDialog === DIALOGS.ACTIVITY_INPUT}
        onClose={() => setActiveDialog()}
      />
      <UpcomingInterviewDialog
        show={activeDialog === DIALOGS.UPCOMING_INTERVIEW}
        onClose={() => setActiveDialog()}
      />
      <AssessmentCompleteDialog
        show={activeDialog === DIALOGS.ASSESSMENT_COMPLETE}
        onClose={() => setActiveDialog()}
      />
      <BackgroundHeader>
        <ScaffoldContainer>
          <Typography component="h1" variant="h2" gutterBottom>
            Welcome, {user && user.firstName}
          </Typography>
          <Typography variant="subtitle1">
            Here’s your personalized action plan. It will update as you make progress.
          </Typography>
        </ScaffoldContainer>
      </BackgroundHeader>
      <Flags
        authorizedFlags={['completeSentiment']}
        renderOn={() => (
          <>
            {showSentiment && (
              <ScaffoldContainer className={classes.container}>
                <SentimentTracker
                  onRecord={onRecordSentiment}
                  onClose={onSentimentClose}
                  user={user.firstName}
                  isComplete={isSentimentLoggedToday}
                />
              </ScaffoldContainer>
            )}
          </>
        )}
        renderOff={() => (
          <>
            {!isSentimentLoggedToday && (
              <ScaffoldContainer className={classes.container}>
                <SentimentTracker
                  onRecord={onRecordSentiment}
                  onClose={onSentimentClose}
                  user={user.firstName}
                />
              </ScaffoldContainer>
            )}
          </>
        )}
      />

      <ScaffoldContainer>
        <Box className={classes.grid}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            className={classes.gridH}
          >
            <Typography variant="h5" className={classes.subtitle} data-intercom="task-count">
              Top {tasks.length} Goals
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => setActiveDialog(DIALOGS.ACTIVITY_INPUT)}
              data-intercom="log-activity-button"
            >
              Log Activity
            </Button>
          </Box>
          <Box className={classes.gridC}>
            <TaskList
              tasks={tasks}
              allActions={allActions}
              allActionDispositionEvents={allActionDispositionEvents}
              allTaskDispositionEvents={allTaskDispositionEvents}
              {...restProps}
            />
          </Box>
          <Flags
            authorizedFlags={['employmentOutlook']}
            renderOn={() => (
              <Box className={classes.gridL} position="relative">
                <EmploymentOutlookLauchpad />
              </Box>
            )}
            renderOff={() => (
              <Box className={classes.gridL}>
                <Card variant="outlined">
                  <CardHeader
                    title="Confidence Level"
                    titleTypographyProps={{ component: 'h2', variant: 'h6' }}
                  />

                  <ActivityCategoryTable
                    allActivityLogEntries={allActivityLogEntries}
                    subsetActivityLogEntries={confidentActivityLogEntries}
                    label="Feeling Confident"
                  />
                </Card>
              </Box>
            )}
          />
          <Box className={classes.gridR}>
            <Card variant="outlined">
              <CardHeader
                title={
                  <Typography component="h2" variant="h6" data-intercom="activity-title">
                    Recent Progress
                  </Typography>
                }
                disableTypography
              />
              <ProgressFeed
                activities={allActivityLogEntries}
                completedTasks={completedTasks}
                limit={historyLimit}
              />
            </Card>
            <Box mt={3} data-intercom="log-interview">
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Upcoming interview?
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    If you have an interview, let us know and we can send helpful guidance to
                    prepare.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setActiveDialog(DIALOGS.UPCOMING_INTERVIEW)}
                  >
                    Let Us Know
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Box>
        </Box>
      </ScaffoldContainer>
    </div>
  );
}

Dashboard.propTypes = {
  allActions: AirtablePropTypes.actions.isRequired,
  allConditions: AirtablePropTypes.conditions.isRequired,
  allPredicates: AirtablePropTypes.predicates.isRequired,
  allTasks: AirtablePropTypes.tasks.isRequired,
  allQualityChecks: AirtablePropTypes.qualityChecks.isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
  allActionDispositionEvents: FirebasePropTypes.querySnapshot,
  allTaskDispositionEvents: FirebasePropTypes.querySnapshot,
  completedTasks: FirebasePropTypes.querySnapshot,
  confidentActivityLogEntries: FirebasePropTypes.querySnapshot,
  historyLimit: PropTypes.number.isRequired,
  allActivityLogEntries: FirebasePropTypes.querySnapshot,
  interviewLogEntries: FirebasePropTypes.querySnapshot,
};

Dashboard.defaultProps = {
  allActionDispositionEvents: [],
  allTaskDispositionEvents: [],
  completedTasks: [],
  confidentActivityLogEntries: [],
  allActivityLogEntries: [],
  interviewLogEntries: [],
};
