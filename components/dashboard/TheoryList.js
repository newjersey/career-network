import React from 'react';
import Grid from '@material-ui/core/Grid';

import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';
import Theory from './Theory';

function isActionDispositioned(action, allActionDispositionEvents) {
  return allActionDispositionEvents
    .map(e => e.data().actionId)
    .includes(action.id);
}

function getNonDispositionedActions(theory, allActions, allActionDispositionEvents) {
  return allActions
    .filter(action => theory.fields.Actions.includes(action.id))
    .filter(action => !isActionDispositioned(action, allActionDispositionEvents));
}

export default function TheoryList(props) {
  const {
    allActions,
    allActionDispositionEvents,
    theories,
    ...restProps
  } = props;

  return (
    <Grid container spacing={7}>
      {theories.map(theory => (
        <Grid item xs={12} sm={6} key={theory.id}>
          <Theory
            theory={theory}
            actions={getNonDispositionedActions(theory, allActions, allActionDispositionEvents)}
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
  theories: AirtablePropTypes.theories.isRequired,
};
