import React from 'react';

import AirtablePropTypes from '../Airtable/PropTypes';
import Task from './Task';

function getResources(action, allResources, propName) {
  if (!action.fields[propName]) {
    return null;
  }

  return allResources.filter(resource => action.fields[propName].includes(resource.id));
}

export default function TaskList(props) {
  const { allActions, allResources } = props;

  return (
    allActions.map(action => (
      <Task
        key={action.id}
        action={action}
        resources={getResources(action, allResources, 'Resources')}
        elaborationResources={getResources(action, allResources, 'Elaboration Resources')}
      />
    ))
  );
}

TaskList.propTypes = {
  allActions: AirtablePropTypes.actions.isRequired,
  allResources: AirtablePropTypes.resources.isRequired,
};
