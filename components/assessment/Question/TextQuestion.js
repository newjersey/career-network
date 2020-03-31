import { makeStyles } from '@material-ui/styles';
import InfoIcon from '@material-ui/icons/Info';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import AirtablePropTypes from '../../Airtable/PropTypes';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    fontWeight: 500,
  },
  helperText: {
    display: 'flex',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    backgroundColor: theme.palette.background.header,
    margin: theme.spacing(0.5, 0),
    padding: theme.spacing(1),
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
  const helperText = question.fields['Helper Text'];

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  return (
    <>
      <span>{question.fields.Label}</span>
      <TextField
        id={question.id}
        disabled={question.fields.Disabled}
        className={classes.textField}
        onBlur={e => onBlur(e.target.value)}
        onChange={e => onChange(e.target.value)}
        variant="outlined"
        helperText={
          helperText && (
            <>
              <InfoIcon color="primary" style={{ fontSize: '1.2rem', marginRight: '0.5rem' }} />
              <span>{helperText}</span>
            </>
          )
        }
        fullWidth
        inputProps={inputProps}
        FormHelperTextProps={{ classes: { root: classes.helperText } }}
        error={reflectError}
        value={value}
        {...restProps}
      />
    </>
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
