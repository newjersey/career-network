import React from 'react';
import Grid from '@material-ui/core/Grid';

import AirtablePropTypes from '../Airtable/PropTypes';
import Theory from './Theory';

function getActions(theory, allActions) {
  return allActions.filter(action => theory.fields.Actions.includes(action.id));
}

export default function TheoryList(props) {
  const { allActions, theories, ...restProps } = props;

  return (
    <Grid container spacing={7}>
      {theories.map(theory => (
        <Grid item xs={12} sm={6} key={theory.id}>
          <Theory theory={theory} actions={getActions(theory, allActions)} {...restProps} />
        </Grid>
      ))}
    </Grid>
  );
}

TheoryList.propTypes = {
  allActions: AirtablePropTypes.actions.isRequired,
  allResources: AirtablePropTypes.resources.isRequired,
  theories: AirtablePropTypes.theories.isRequired,
};
