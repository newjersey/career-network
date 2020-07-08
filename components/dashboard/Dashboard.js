import { isToday } from 'date-fns';
import { makeStyles } from '@material-ui/styles';
import { Flags } from 'react-feature-flags';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import StarIcon from '@material-ui/icons/Star';
import every from 'lodash/every';

import { WEEKLY_ACTION_PLAN_COMPLETE } from '../constants';
import { getFirstIncompleteAction, isDone, mostRecent } from '../../src/app-helper';
import { useAnalytics } from '../Analytics';
import { useAuth } from '../Auth';
import ActivityInputDialog from '../activityInput/ActivityInputDialog';
import ActionPlanBar from './ActionPlan/ActionPlanBar';
import ActionPlanUpdateDialog from './ActionPlan/ActionPlanUpdateDialog';
import AirtablePropTypes from '../Airtable/PropTypes';
import ApplicationTrackerCard from './ApplicationTrackerCard';
import AssessmentCompleteDialog from './AssessmentCompleteDialog';
import BackgroundHeader from '../BackgroundHeader';
import FirebasePropTypes from '../Firebase/PropTypes';
import ProgressFeed from './ProgressFeed';
import ScaffoldContainer from '../ScaffoldContainer';
import SentimentTracker from './SentimentTracker/SentimentTracker';
import TaskList from './TaskList';
import TimeDistanceParser from '../../src/time-distance-parser';
import UpcomingInterviewDialog from './UpcomingInterviewDialog/UpcomingInterviewDialog';
import UserProfileCard from './UserProfileCard';
import CelebrationDialog from '../CelebrationDialog';
import ActivityTemplateCard from './ActivityTemplateCard';

const TASK_COUNT_LIMIT = 3;
const ROW_GAP = 2;
const COL_GAP = 2;

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  container: {
    marginTop: theme.spacing(-5),
  },
  card: {
    padding: theme.spacing(2),
  },
  cardContent: {
    padding: theme.spacing(1),
  },
  backgroundHeader: {
    paddingTop: theme.spacing(3),
  },
  planSetting: {
    position: 'absolute',
    Top: 0,
    right: 0,
    color: theme.palette.background.dark,
  },
  iconContainer: {
    flexShrink: 0,
    display: 'flex',
  },
  labelContainer: {
    marginLeft: 5,
    textDecoration: 'underline',
    fontWeight: 'bold',
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
  ACTION_PLAN_UPDATE: 'ActionPlanUpdateDialog',
  CELEBRATION: 'CelebrationDialog',
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function Dashboard(props) {
  const analytics = useAnalytics();
  const classes = useStyles();
  const { user, userDocRef } = useAuth();
  const {
    allConditions,
    allPredicates,
    allTasks,
    allQuestionResponses,
    allActions,
    allActivityTemplates,
    allActionDispositionEvents,
    completionEvents,
    allTaskDispositionEvents,
    completedTasks,
    historyLimit,
    activityLogEntries,
    allApplicationLogEntries,
    ...restProps
  } = props;

  const tasks = getTasks(props, TASK_COUNT_LIMIT);
  const completedTaskIds = completedTasks.map(task => task.data().taskId);
  const incompleteActivityTemplates = allActivityTemplates.filter(
    template => !completedTaskIds.includes(template.slug)
  );
  const [activeDialog, setActiveDialog] = useState();
  const isSentimentLoggedToday =
    user.lastSentimentTimestamp && isToday(user.lastSentimentTimestamp.toDate());
  const isSentimentClosedToday =
    user.lastSentimentCloseTimestamp && isToday(user.lastSentimentCloseTimestamp.toDate());
  const showSentiment = !isSentimentLoggedToday || !isSentimentClosedToday;

  const onRecordSentiment = sentiment => {
    const lastSentiment = {
      label: sentiment.label,
      timestamp: new Date(),
      closeTimestamp: null,
    };
    userDocRef.set({ lastSentiment }, { merge: true });

    const data = {
      timestamp: new Date(),
      ...sentiment,
    };
    userDocRef.collection('sentimentEvents').add(data);
    analytics.trackEvent('logged-sentiment', sentiment);
  };

  const onCloseSentiment = () => {
    const lastSentiment = {
      closeTimestamp: new Date(),
    };
    userDocRef.set({ lastSentiment }, { merge: true });
  };

  const handleSentimentPostSubmissionButtonClicked = () => {
    const firstIncompleteAction = getFirstIncompleteAction(
      tasks[0],
      allTaskDispositionEvents,
      allActions,
      allActionDispositionEvents
    );

    if (!firstIncompleteAction) {
      throw new Error(`Unable to get first incomplete action for task ${tasks[0].id}`);
    }

    PubSub.publish('SHOW_ACTION_BY_ID', firstIncompleteAction.id);
  };

  const handleActionComplete = () => {
    onCloseSentiment();
  };

  useEffect(() => {
    if (user.shouldSeeAssesssmentCompletionCelebration) {
      userDocRef.set({ shouldSeeAssesssmentCompletionCelebration: false }, { merge: true });
      setActiveDialog(DIALOGS.ASSESSMENT_COMPLETE);
    }
  }, [user.shouldSeeAssesssmentCompletionCelebration, userDocRef]);

  useEffect(() => {
    const statKeys = ['goals', 'applications', 'activities'];

    if (
      user.weeklyStats &&
      user.weeklyStats.showCelebration &&
      every(statKeys, key => user.weeklyStats[key] >= user.actionPlan[key])
    ) {
      userDocRef.set({ weeklyStats: { showCelebration: false } }, { merge: true });
      userDocRef
        .collection('completionEvents')
        .add({ timestamp: new Date(), type: WEEKLY_ACTION_PLAN_COMPLETE });
      setActiveDialog(DIALOGS.CELEBRATION);
    }
  }, [user.weeklyStats]); // eslint-disable-line react-hooks/exhaustive-deps

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
        onLogActivityButtonClick={() => setActiveDialog(DIALOGS.ACTIVITY_INPUT)}
      />
      <ActionPlanUpdateDialog
        show={activeDialog === DIALOGS.ACTION_PLAN_UPDATE}
        handleClose={() => setActiveDialog()}
        actionPlan={user.actionPlan}
      />
      <CelebrationDialog
        show={activeDialog === DIALOGS.CELEBRATION}
        onClose={() => setActiveDialog()}
      />
      <BackgroundHeader className={classes.backgroundHeader}>
        <ScaffoldContainer>
          <Box position="relative" display="flex">
            <Flags authorizedFlags={['actionPlan']}>
              <Button
                classes={{ root: classes.planSetting }}
                onClick={() => setActiveDialog(DIALOGS.ACTION_PLAN_UPDATE)}
              >
                <span className={classes.iconContainer}>
                  <SettingsIcon />
                </span>
                <span className={classes.labelContainer}>UPDATE ACTION PLAN</span>
              </Button>
            </Flags>
            <Box mt={4}>
              <Typography component="h1" variant="h2" style={{ fontWeight: 700 }} gutterBottom>
                Welcome, {user && user.firstName}
              </Typography>
              <Typography variant="subtitle1">
                Here’s your personalized action plan. It will update as you make progress.
              </Typography>
            </Box>
          </Box>
        </ScaffoldContainer>
      </BackgroundHeader>

      <ScaffoldContainer className={classes.container}>
        <Flags
          authorizedFlags={['actionPlan']}
          renderOn={() => (
            <ActionPlanBar userStats={user.weeklyStats} actionPlan={user.actionPlan} />
          )}
          renderOff={() => (
            <>
              {showSentiment && (
                <ScaffoldContainer className={classes.container}>
                  <SentimentTracker
                    onRecord={onRecordSentiment}
                    onClose={onCloseSentiment}
                    onPostSubmissionButtonClicked={handleSentimentPostSubmissionButtonClicked}
                    lastRecordedValue={user.lastSentimentLabel ? user.lastSentimentLabel : ''}
                    isComplete={isSentimentLoggedToday}
                  />
                </ScaffoldContainer>
              )}
            </>
          )}
        />
      </ScaffoldContainer>

      <ScaffoldContainer>
        <Box className={classes.grid}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            className={classes.gridH}
          >
            <Flags
              authorizedFlags={['activityTemplate']}
              renderOn={() => (
                <Typography variant="h5" className={classes.subtitle} data-intercom="task-count">
                  <StarIcon className={classes.icon} />
                  Recommended Activities
                </Typography>
              )}
              renderOff={() => (
                <Typography variant="h5" className={classes.subtitle} data-intercom="task-count">
                  Top {tasks.length} Goals
                </Typography>
              )}
            />
          </Box>
          <Box className={classes.gridC}>
            <Flags
              authorizedFlags={['activityTemplate']}
              renderOn={() =>
                incompleteActivityTemplates
                  .slice(0, 3)
                  .map(template => (
                    <ActivityTemplateCard
                      key={template.slug}
                      totalTime={template.total_time}
                      {...template}
                    />
                  ))
              }
              renderOff={() => (
                <TaskList
                  tasks={tasks}
                  allActions={allActions}
                  allActionDispositionEvents={allActionDispositionEvents}
                  allTaskDispositionEvents={allTaskDispositionEvents}
                  onActionComplete={handleActionComplete}
                  {...restProps}
                />
              )}
            />
          </Box>
          <Box className={classes.gridL} position="relative">
            <Flags authorizedFlags={['userProfile']}>
              <Box mb={3}>
                <UserProfileCard user={user} />
              </Box>
            </Flags>
            {
              // Hide this feature since the data has become out of sync with the current climate
              /* <Box mt={8} style={{ position: 'relative' }}>
                      <EmploymentOutlookLauchpad />
                </Box> */
            }
            <Flags authorizedFlags={['activityLog']}>
              <Box mb={3}>
                <Card variant="outlined">
                  <CardHeader
                    title={
                      <Typography component="h2" variant="h6" data-intercom="activity-title">
                        Action Log
                      </Typography>
                    }
                    disableTypography
                  />
                  <ProgressFeed
                    activities={activityLogEntries}
                    completedTasks={completedTasks}
                    applications={allApplicationLogEntries}
                    completionEvents={completionEvents}
                    limit={historyLimit}
                  />
                </Card>
              </Box>
            </Flags>
          </Box>
          <Box className={classes.gridR}>
            <Flags authorizedFlags={['activityLog']}>
              <Box mb={3}>
                <Card variant="outlined" className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" gutterBottom>
                      Log an Activity
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Our research suggests jobseekers who track their progress land their next role
                      faster. The activity log allows you to track your job search activities even
                      outside of this platform.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      size="large"
                      data-intercom="log-activity-button"
                      onClick={() => setActiveDialog(DIALOGS.ACTIVITY_INPUT)}
                    >
                      Log An Activity
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            </Flags>
            <Flags authorizedFlags={['applicationTracker']}>
              <Box mb={3} data-intercom="application-tracker">
                <ApplicationTrackerCard applications={allApplicationLogEntries} />
              </Box>
            </Flags>
            <Box mb={3} data-intercom="log-interview">
              <Card variant="outlined" className={classes.card}>
                <CardContent className={classes.cardContent}>
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
                    variant="contained"
                    size="large"
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
  allActivityTemplates: PropTypes.arrayOf(PropTypes.object),
  allActionDispositionEvents: FirebasePropTypes.querySnapshot,
  completionEvents: FirebasePropTypes.querySnapshot,
  allTaskDispositionEvents: FirebasePropTypes.querySnapshot,
  completedTasks: FirebasePropTypes.querySnapshot,
  historyLimit: PropTypes.number.isRequired,
  activityLogEntries: FirebasePropTypes.querySnapshot,
  allApplicationLogEntries: FirebasePropTypes.querySnapshot,
  interviewLogEntries: FirebasePropTypes.querySnapshot,
};

Dashboard.defaultProps = {
  allActionDispositionEvents: [],
  allActivityTemplates: [],
  allTaskDispositionEvents: [],
  completedTasks: [],
  activityLogEntries: [],
  allApplicationLogEntries: [],
  completionEvents: [],
  interviewLogEntries: [],
};
