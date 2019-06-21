import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

import AirtablePropTypes from '../../Airtable/PropTypes';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  textField: {
    // paddingTop: theme.spacing(1),
  },
}));

export default function TextQuestion(props) {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const { question, type, autoComplete } = props;

  return (
    <TextField
      id={question.id}
      label={question.fields.Label}
      className={classes.textField}
      value={value}
      onChange={event => setValue(event.target.value)}
      margin="normal"
      type={type}
      autoComplete={autoComplete}
      fullWidth
    />
  );
}

TextQuestion.propTypes = {
  question: AirtablePropTypes.question.isRequired,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
};

TextQuestion.defaultProps = {
  type: null,
  autoComplete: null,
};
