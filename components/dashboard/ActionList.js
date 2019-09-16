import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import Action from './Action';
import AirtablePropTypes from '../Airtable/PropTypes';
import FirebasePropTypes from '../Firebase/PropTypes';

// persistance model allows for future disposition states (snooze, skip, etc.)
function isDone(action, allActionDispositionEvents) {
  // TODO: sort on the server
  const currentDispositionEvent = allActionDispositionEvents
    .filter(e => e.data().actionId === action.id)
    .sort((a, b) => b.data().timestamp.seconds - a.data().timestamp.seconds)[0];

  return !!currentDispositionEvent && currentDispositionEvent.data().type === 'done';
}

export default function ActionList(props) {
  const { actions, allActionDispositionEvents, onAllDone, ...restProps } = props;
  const allDone = actions
    .map(action => isDone(action, allActionDispositionEvents))
    .reduce((a, b) => a && b, true);

  const onDone = (action, i) => {
    // last action in the task
    if (i === actions.length - 1) {
      onAllDone();
    }
  };

  return (
    <div>
      <ol>
        {actions.map((action, i) => (
          <Action
            key={action.id}
            action={action}
            disabled={i > 0 && !isDone(actions[i - 1], allActionDispositionEvents)}
            isDone={isDone(action, allActionDispositionEvents)}
            onDone={() => onDone(action, i)}
            {...restProps}
          />
        ))}
      </ol>
      {allDone && (
        <center>
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          <Typography variant="h4" color="secondary" gutterBottom>
            <br />
            You finished this task—great job!&nbsp;&nbsp;🎉
          </Typography>
        </center>
      )}
    </div>
  );
}

ActionList.propTypes = {
  actions: AirtablePropTypes.actions.isRequired,
  allActionDispositionEvents: FirebasePropTypes.querySnapshot.isRequired,
  allQualityChecks: AirtablePropTypes.qualityChecks.isRequired,
  onAllDone: PropTypes.func.isRequired,
};
