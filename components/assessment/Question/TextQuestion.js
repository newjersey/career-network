import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
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
    inputProps,
    isInGroup,
    onBlur,
    onChange,
    optional,
    onValidationChange,
    question,
    reflectValidity,
    value,
    ...restProps
  } = props;
  const isValid = optional || !!value;
  const reflectError = reflectValidity && !isValid;

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

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
      inputProps={inputProps}
      error={reflectError}
      value={value}
      {...restProps}
    />
  );
}

TextQuestion.propTypes = {
  autoComplete: PropTypes.string,
  inputProps: PropTypes.shape({
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
  }),
  isInGroup: PropTypes.bool,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onValidationChange: PropTypes.func.isRequired,
  optional: PropTypes.bool.isRequired,
  question: AirtablePropTypes.question.isRequired,
  reflectValidity: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

TextQuestion.defaultProps = {
  autoComplete: null,
  inputProps: {},
  isInGroup: false,
  reflectValidity: false,
  type: null,
};
