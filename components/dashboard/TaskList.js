import React from 'react';
import PropTypes from 'prop-types';

import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';
import Task from './Task';

function isActionDispositioned(action, allActionDispositionEvents, debugMode) {
  return debugMode
    ? false
    : allActionDispositionEvents.map(e => e.data().actionId).includes(action.id);
}

function getNonDispositionedActions(task, debugMode, allActions, allActionDispositionEvents) {
  return allActions
    .filter(action => task.fields.Actions.includes(action.id))
    .filter(action => !isActionDispositioned(action, allActionDispositionEvents, debugMode));
}

export default function TaskList(props) {
  const { allActions, allActionDispositionEvents, debugMode, tasks, ...restProps } = props;

  return (
    <div>
      {/* <Grid container spacing={7}> */}
      {tasks
        .sort((a, b) => b.fields.Priority - a.fields.Priority)
        .map(task => (
          // <Grid item xs={12} sm key={task.id}>
          <Task
            key={task.id}
            task={task}
            actions={getNonDispositionedActions(
              task,
              debugMode,
              allActions,
              allActionDispositionEvents
            )}
            {...restProps}
          />
          // </Grid>
        ))}
      {/* </Grid> */}
    </div>
  );
}

TaskList.propTypes = {
  allActions: AirtablePropTypes.actions.isRequired,
  allActionDispositionEvents: FirebasePropTypes.querySnapshot.isRequired,
  debugMode: PropTypes.bool.isRequired,
  tasks: AirtablePropTypes.tasks.isRequired,
};
