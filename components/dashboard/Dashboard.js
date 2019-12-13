import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { useAuth } from '../Auth';
import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';
import ScaffoldContainer from '../ScaffoldContainer';
import SentimentTracker from './SentimentTracker';
import ActivityList from './ActivityList';
import TaskList from './TaskList';
import TimeDistanceParser from '../../src/time-distance-parser';
import ActivityInputDialog from './ActivityInputDialog';
import UpcomingInterviewDialog from './UpcomingInterviewDialog/UpcomingInterviewDialog';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),
  },
  subtitle: {
    display: 'inline-block',
    marginTop: theme.spacing(3),
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
function isSatisfied(conditionId, allConditions, allPredicates, allQuestionResponses) {
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
    .map(conditionId => isSatisfied(conditionId, allConditions, allPredicates, allQuestionResponses))
    .reduce((a, b) => a || b, false);
}

// Whether or not a task's trigger is true for the current user.
function triggerApplies(task, allConditions, allPredicates, allQuestionResponses) {
  switch (task.fields.Trigger) {
    case 'Conditions':
      return isAnyConditionSatisfied(task, allConditions, allPredicates, allQuestionResponses);
    case 'Everyone':
      return true;
    default:
      return false;
  }
}

function tasksToShow(_props) {
  const {
    allConditions,
    allPredicates,
    allTasks,
    allQuestionResponses,
    // allActions,
    // allActionDispositionEvents,
  } = _props;

  // 1. does trigger apply?
  // 2. TODO: are prerequisites satisfied?
  // 3. TODO: does frequency indicate to show (heeding dispositions)?
  // 4. sort
  return allTasks
    .filter(task => triggerApplies(task, allConditions, allPredicates, allQuestionResponses))
    .sort((a, b) => b.fields.Priority - a.fields.Priority);
}

const DIALOGS = {
  ACTIVITY_INPUT: 'ActivityInputDialog',
  UPCOMING_INTERVIEW: 'UpcomingInterviewDialog',
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function Dashboard(props) {
  const classes = useStyles();
  const { user } = useAuth();
  const {
    allConditions,
    allPredicates,
    allTasks,
    allQuestionResponses,
    allActions,
    allActionDispositionEvents,
    allTaskDispositionEvents,
    allActivityLogEntries,
    ...restProps
  } = props;

  const todoTaskLimit = 3;

  const allApplicableTasks = tasksToShow(props);
  const doneTaskCount = allTaskDispositionEvents.length;
  const todoTaskCount = Math.min(allApplicableTasks.length - doneTaskCount, todoTaskLimit);
  const tasks = allApplicableTasks.slice(0, todoTaskCount + doneTaskCount);
  const [activeDialog, setActiveDialog] = useState();

  useEffect(() => {
    window.Intercom('update', { 'tasks-completed': doneTaskCount });
  }, [doneTaskCount]);

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
      <ScaffoldContainer>
        <Typography component="h1" variant="h2" gutterBottom>
          Hi, {user && user.firstName}!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Here’s your personalized action plan. It will update as you make progress.
        </Typography>
        <SentimentTracker />
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Grid container alignItems="baseline" justify="space-between" direction="row">
              <Typography variant="h5" className={classes.subtitle} data-intercom="task-count">
                Top {todoTaskCount} goals
                {doneTaskCount > 0 && ` (and ${doneTaskCount} completed)`}
              </Typography>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setActiveDialog(DIALOGS.ACTIVITY_INPUT)}
              >
                Log Activity
              </Button>
            </Grid>

            <TaskList
              tasks={tasks}
              allActions={allActions}
              allActionDispositionEvents={allActionDispositionEvents}
              allTaskDispositionEvents={allTaskDispositionEvents}
              {...restProps}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h5" className={classes.subtitle} data-intercom="activity-title">
              Latest activities
            </Typography>
            <ActivityList activities={allActivityLogEntries} />
            <Card>
              <CardContent>
                <Typography variant="body1" fontWeight="bold">
                  Have an upcoming interview?
                </Typography>
                <Typography variant="body1" gutterBottom>
                  If you have an interview, let us know and we can send helpful guidance to prepare.
                </Typography>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setActiveDialog(DIALOGS.UPCOMING_INTERVIEW)}
                >
                  Let Us Know
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
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
  allActivityLogEntries: FirebasePropTypes.querySnapshot,
};

Dashboard.defaultProps = {
  allActionDispositionEvents: [],
  allTaskDispositionEvents: [],
  allActivityLogEntries: [],
};
