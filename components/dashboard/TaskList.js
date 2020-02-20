import { confetti } from 'dom-confetti';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';

import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';
import Task from './Task';
import { isDone } from '../../src/app-helper';

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

function getNextAction(task, allActions, allActionDispositionEvents) {
  return getActions(task, allActions).find(
    action => !isDone(action, allActionDispositionEvents, 'actionId')
  );
}

export default function TaskList(props) {
  const { allActions, allActionDispositionEvents, tasks, showNextAction, ...restProps } = props;
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
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onDone={onTaskComplete}
            actions={getActions(task, allActions)}
            actionTriggered={
              showNextAction && tasks.length > 0 && task.id === tasks[0].id
                ? getNextAction(tasks[0], allActions, allActionDispositionEvents).id
                : null
            }
            allActionDispositionEvents={allActionDispositionEvents}
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
  tasks: AirtablePropTypes.tasks.isRequired,
  showNextAction: PropTypes.bool,
  onActionClose: PropTypes.func,
};

TaskList.defaultProps = {
  showNextAction: false,
  onActionClose: null,
};
