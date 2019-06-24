import React from 'react';

import AirtablePropTypes from '../Airtable/PropTypes';
import Theory from './Theory';

function getActions(theory, allActions) {
  return allActions.filter(action => theory.fields.Actions.includes(action.id));
}

export default function TheoryList(props) {
  const { allActions, theories, ...restProps } = props;

  return (
    theories.map(theory => (
      <Theory
        key={theory.id}
        theory={theory}
        actions={getActions(theory, allActions)}
        {...restProps}
      />
    ))
  );
}

TheoryList.propTypes = {
  allActions: AirtablePropTypes.actions.isRequired,
  allResources: AirtablePropTypes.resources.isRequired,
  theories: AirtablePropTypes.theories.isRequired,
};
