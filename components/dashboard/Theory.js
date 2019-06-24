import React from 'react';

import ActionList from './ActionList';
import AirtablePropTypes from '../Airtable/PropTypes';

export default function Theory(props) {
  const { theory, ...restProps } = props;

  return (
    <div>
      {theory.fields.Name}
      <ActionList {...restProps} />
    </div>
  );
}

Theory.propTypes = {
  actions: AirtablePropTypes.actions.isRequired,
  allResources: AirtablePropTypes.resources.isRequired,
  theory: AirtablePropTypes.theory.isRequired,
};
