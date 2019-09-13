import React from 'react';
import Typography from '@material-ui/core/Typography';

import Action from './Action';
import AirtablePropTypes from '../Airtable/PropTypes';

export default function ActionList(props) {
  const { actions, ...restProps } = props;

  const defaultDones = new Array(actions.length);
  defaultDones.fill(false);

  const [dones, setDones] = React.useState(defaultDones);
  const allDone = dones.reduce((a, b) => a && b, true);

  function onDone(i) {
    const newDones = [...dones];
    newDones[i] = true;
    setDones(newDones);
  }

  return (
    <div>
      <ol>
        {actions.map((action, i) => (
          <Action
            key={action.id}
            action={action}
            disabled={i > 0 && !dones[i - 1]}
            onDone={() => onDone(i)}
            {...restProps}
          />
        ))}
      </ol>
      {allDone && (
        <center>
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          <Typography variant="h3" color="secondary">
            🎉&nbsp;&nbsp;<em>You finished this task—great job!</em>
          </Typography>
        </center>
      )}
    </div>
  );
}

ActionList.propTypes = {
  actions: AirtablePropTypes.actions.isRequired,
  allQualityChecks: AirtablePropTypes.qualityChecks.isRequired,
};
