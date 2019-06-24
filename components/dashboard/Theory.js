import React from 'react';
import Typography from '@material-ui/core/Typography';

import ActionList from './ActionList';
import AirtablePropTypes from '../Airtable/PropTypes';

export default function Theory(props) {
  const { theory, ...restProps } = props;

  return (
    <div>
      <Typography component="h2" variant="h5" gutterBottom>
        {theory.fields.Name}
      </Typography>
      <ActionList {...restProps} />
    </div>
  );
}

Theory.propTypes = {
  actions: AirtablePropTypes.actions.isRequired,
  allResources: AirtablePropTypes.resources.isRequired,
  theory: AirtablePropTypes.theory.isRequired,
};
