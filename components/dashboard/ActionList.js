import React from 'react';

import AirtablePropTypes from '../Airtable/PropTypes';
import Action from './Action';

export default function ActionList(props) {
  const { actions, ...restProps } = props;

  return (
    <ol>
      {actions.map(action => (
        <Action key={action.id} action={action} {...restProps} />
      ))}
    </ol>
  );
}

ActionList.propTypes = {
  actions: AirtablePropTypes.actions.isRequired,
  allQualityChecks: AirtablePropTypes.qualityChecks.isRequired,
};
