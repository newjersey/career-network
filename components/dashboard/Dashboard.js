import { makeStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';
import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';
import ScaffoldContainer from '../ScaffoldContainer';
import TheoryList from './TheoryList';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [debugMode, setDebugMode] = useState(false);
  const { user } = useAuth();
  const {
    allConditions,
    allPredicates,
    allTheories,
    allQuestionResponses,
    ...restProps
  } = props;

  // Whether or not a predicate evaluates to true for the curent user.
  function isTrue(predicateId) {
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
      case 'Text':
      case 'Binary':
        predicateValue = constantValue;
        break;
      case 'Option':
        [predicateValue] = optionValue;
        break;
      case 'Date':
        // TODO
        predicateValue = constantValue;
        break;
      case 'Number':
        predicateValue = constantValue.includes('.')
          ? parseFloat(constantValue)
          : parseInt(constantValue, 10);
        responseValue = responseValue.includes('.')
          ? parseFloat(responseValue)
          : parseInt(responseValue, 10);
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
        return responseValue.includes(predicateValue);
      case 'does not contain':
        return !responseValue.includes(predicateValue);
      default:
        throw new Error(`Unexpected predicate operator: ${operator}`);
    }
  }

  // Whether or not any of a condition's predicates are true for the current user.
  function isSatisfied(conditionId) {
    const condition = allConditions.find(_condition => _condition.id === conditionId);

    if (!condition) {
      // TODO: log warning (likely indicates a misconfiguration)
      return null;
    }

    return condition.fields.Predicates
      .map(predicateId => isTrue(predicateId))
      .reduce((a, b) => a || b, false);
  }

  // Whether or not all of a theory's conditions are satisfied by the current user.
  function isIndicated(theory) {
    return theory.fields.Conditions
      .map(conditionId => isSatisfied(conditionId))
      .reduce((a, b) => a && b, true);
  }

  const theories = debugMode ? allTheories : allTheories
    .filter(theory => isIndicated(theory))
    .slice(0, 2); // take the top two (arbitrary, looks good in columns)

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item>
            <Typography component="h1" variant="h2" gutterBottom>
              Hi,
              {' '}
              {user && user.firstName}
              !
            </Typography>
          </Grid>
          <Grid item>
            <FormGroup row>
              <FormControlLabel
                label="Show all"
                control={
                  <Switch checked={debugMode} onChange={e => setDebugMode(e.target.checked)} />
                }
              />
            </FormGroup>
          </Grid>
        </Grid>
        <TheoryList theories={theories} {...restProps} />
      </ScaffoldContainer>
    </div>
  );
}

Dashboard.propTypes = {
  allActions: AirtablePropTypes.actions.isRequired,
  allConditions: AirtablePropTypes.conditions.isRequired,
  allPredicates: AirtablePropTypes.predicates.isRequired,
  allResources: AirtablePropTypes.resources.isRequired,
  allTheories: AirtablePropTypes.theories.isRequired,
  allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired,
};
