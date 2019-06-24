import React from 'react';

import AirtablePropTypes from '../Airtable/PropTypes';
import Action from './Action';

function getResources(action, allResources, propName) {
  if (!action.fields[propName]) {
    return null;
  }

  return allResources.filter(resource => action.fields[propName].includes(resource.id));
}

export default function ActionList(props) {
  const { actions, allResources } = props;

  return (
    actions.map(action => (
      <Action
        key={action.id}
        action={action}
        resources={getResources(action, allResources, 'Resources')}
        elaborationResources={getResources(action, allResources, 'Elaboration Resources')}
      />
    ))
  );
}

ActionList.propTypes = {
  actions: AirtablePropTypes.actions.isRequired,
  allResources: AirtablePropTypes.resources.isRequired,
};
