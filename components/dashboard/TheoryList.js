import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';
import Theory from './Theory';

function isActionDispositioned(action, allActionDispositionEvents, debugMode) {
  return debugMode
    ? false
    : allActionDispositionEvents.map(e => e.data().actionId).includes(action.id);
}

function getNonDispositionedActions(theory, debugMode, allActions, allActionDispositionEvents) {
  return allActions
    .filter(action => theory.fields.Actions.includes(action.id))
    .filter(action => !isActionDispositioned(action, allActionDispositionEvents, debugMode));
}

export default function TheoryList(props) {
  const { allActions, allActionDispositionEvents, debugMode, theories, ...restProps } = props;

  return (
    <Grid container spacing={7}>
      {theories.map(theory => (
        <Grid item xs={12} sm={6} key={theory.id}>
          <Theory
            theory={theory}
            actions={getNonDispositionedActions(
              theory,
              debugMode,
              allActions,
              allActionDispositionEvents
            )}
            {...restProps}
          />
        </Grid>
      ))}
    </Grid>
  );
}

TheoryList.propTypes = {
  allActions: AirtablePropTypes.actions.isRequired,
  allResources: AirtablePropTypes.resources.isRequired,
  allActionDispositionEvents: FirebasePropTypes.querySnapshot.isRequired,
  debugMode: PropTypes.bool.isRequired,
  theories: AirtablePropTypes.theories.isRequired,
};
