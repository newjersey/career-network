import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
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
  const {
    onBlur,
    onChange,
    question,
    ...restProps
  } = props;

  return (
    <TextField
      id={question.id}
      disabled={question.fields.Disabled}
      label={question.fields.Label}
      className={classes.textField}
      onBlur={e => onBlur(e.target.value)}
      onChange={e => onChange(e.target.value)}
      margin="normal"
      helperText={question.fields['Helper Text']}
      fullWidth
      {...restProps}
    />
  );
}

TextQuestion.propTypes = {
  autoComplete: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  question: AirtablePropTypes.question.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

TextQuestion.defaultProps = {
  autoComplete: null,
  type: null,
};
