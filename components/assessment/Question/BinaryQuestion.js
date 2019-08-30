import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

import AirtablePropTypes from '../../Airtable/PropTypes';

export default function BinaryQuestion(props) {
  const { onChange, question, value } = props;
  const checkbox = useRef(null);

  useEffect(() => {
    // hack: persist check box values when they're first rendered,
    // otherwise we don't get "false" recorded on checkboxes never touched.
    onChange(checkbox.current.checked);
  });

  return (
    <FormControlLabel
      disabled={question.fields.Disabled}
      label={question.fields.Label}
      control={
        <Checkbox
          color="primary"
          checked={value}
          value={question.id}
          inputRef={checkbox}
          onChange={e => onChange(e.target.checked)}
        />
      }
    />
  );
}

BinaryQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  question: AirtablePropTypes.question.isRequired,
  value: PropTypes.bool.isRequired,
};
