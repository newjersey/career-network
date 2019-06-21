import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import React from 'react';

import AirtablePropTypes from '../../Airtable/PropTypes';

export default function BinaryQuestion(props) {
  const { onChange, question, value } = props;

  return (
    <FormControlLabel
      label={question.fields.Label}
      control={(
        <Checkbox
          color="primary"
          checked={value}
          value={question.id}
          onChange={e => onChange(e.target.checked)}
        />
      )}
    />
  );
}

BinaryQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  question: AirtablePropTypes.question.isRequired,
  value: PropTypes.bool.isRequired,
};
