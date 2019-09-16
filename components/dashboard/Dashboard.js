import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';
import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';
import ScaffoldContainer from '../ScaffoldContainer';
import TaskList from './TaskList';
// eslint-disable-next-line no-unused-vars
import TimeDistanceParser from '../../src/time-distance-parser';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),
  },
  subtitle: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
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
    case 'Initial assessment':
      return isAnyConditionSatisfied(task, allConditions, allPredicates, allQuestionResponses);
    case 'Everyone':
      return true;
    default:
      return false;
  }
}

function tasksToShow(_props, limit) {
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
  // 5. limit
  return allTasks
    .filter(task => triggerApplies(task, allConditions, allPredicates, allQuestionResponses))
    .sort((a, b) => b.fields.Priority - a.fields.Priority)
    .slice(0, limit);
}

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
    ...restProps
  } = props;

  const limit = 3;
  const doneTaskCount = allTaskDispositionEvents.length;

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography component="h1" variant="h2" gutterBottom>
          Hi, {user && user.firstName}!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Here’s your personalized action plan. It will update as you make progress.
        </Typography>
        <Typography variant="h5" gutterBottom className={classes.subtitle}>
          Your top {limit} tasks
          {doneTaskCount > 0 && ` (and ${doneTaskCount} completed)`}
        </Typography>
        <TaskList
          tasks={tasksToShow(props, limit + doneTaskCount)}
          allActions={allActions}
          allActionDispositionEvents={allActionDispositionEvents}
          {...restProps}
        />
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
  allActionDispositionEvents: FirebasePropTypes.querySnapshot.isRequired,
  allTaskDispositionEvents: FirebasePropTypes.querySnapshot.isRequired,
};
