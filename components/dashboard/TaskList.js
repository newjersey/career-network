import React from 'react';

import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';
import Task from './Task';

function getActions(task, allActions) {
  return allActions.filter(action => task.fields.Actions.includes(action.id));
}

export default function TaskList(props) {
  const { allActions, tasks, ...restProps } = props;

  return (
    <div>
      {tasks.map(task => (
        <Task key={task.id} task={task} actions={getActions(task, allActions)} {...restProps} />
      ))}
    </div>
  );
}

TaskList.propTypes = {
  allActions: AirtablePropTypes.actions.isRequired,
  allQualityChecks: AirtablePropTypes.qualityChecks.isRequired,
  allActionDispositionEvents: FirebasePropTypes.querySnapshot.isRequired,
  tasks: AirtablePropTypes.tasks.isRequired,
};
