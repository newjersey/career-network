import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React, { useState } from 'react';

import AirtablePropTypes from '../../Airtable/PropTypes';

export default function BinaryQuestion(props) {
  const [value, setValue] = useState(false);
  const { question } = props;

  return (
    <FormControlLabel
      label={question.fields.Name}
      control={(
        <Checkbox
          checked={value}
          value={question.id}
          onChange={event => setValue(event.target.checked)}
        />
      )}
    />
  );
}

BinaryQuestion.propTypes = {
  question: AirtablePropTypes.question.isRequired,
};
