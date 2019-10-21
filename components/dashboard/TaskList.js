import { confetti } from 'dom-confetti';
import { makeStyles } from '@material-ui/styles';
import React, { useCallback, useRef } from 'react';

import { isDone } from '../../src/app-helper';
import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';
import Task from './Task';

const useStyles = makeStyles(() => ({
  confetti: {
    zIndex: 999,
    position: 'fixed',
    left: '50%',
    bottom: '15%',
    transform: 'translateX(-50%)',
  },
}));

const confettiConfig = {
  angle: '90',
  spread: '70',
  startVelocity: 60,
  elementCount: '80',
  dragFriction: 0.1,
  duration: '6500',
  stagger: '1',
  width: '10px',
  height: '16px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

function getActions(task, allActions) {
  return allActions.filter(action => task.fields.Actions.includes(action.id));
}

export default function TaskList(props) {
  const { allActions, allTaskDispositionEvents, tasks, ...restProps } = props;
  const classes = useStyles();
  const confettiRef = useRef();

  const onTaskComplete = useCallback(() => {
    confetti(confettiRef.current, confettiConfig);
    window.setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 1000);
  }, []);

  return (
    <>
      <div className={classes.confetti} ref={confettiRef} />
      <div>
        {tasks
          .sort(
            (taskA, taskB) =>
              isDone(taskA, allTaskDispositionEvents, 'taskId') -
              isDone(taskB, allTaskDispositionEvents, 'taskId')
          )
          .map(task => (
            <Task
              key={task.id}
              task={task}
              isDone={isDone(task, allTaskDispositionEvents, 'taskId')}
              onDone={onTaskComplete}
              actions={getActions(task, allActions)}
              {...restProps}
            />
          ))}
      </div>
    </>
  );
}

TaskList.propTypes = {
  allActions: AirtablePropTypes.actions.isRequired,
  allQualityChecks: AirtablePropTypes.qualityChecks.isRequired,
  allActionDispositionEvents: FirebasePropTypes.querySnapshot.isRequired,
  allTaskDispositionEvents: FirebasePropTypes.querySnapshot.isRequired,
  tasks: AirtablePropTypes.tasks.isRequired,
};
