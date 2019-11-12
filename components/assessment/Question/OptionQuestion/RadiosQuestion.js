import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useEffect } from 'react';

import AirtablePropTypes from '../../../Airtable/PropTypes';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  formControlLabel: {
    marginRight: theme.spacing(7),
  },
}));

export default function RadiosQuestion(props) {
  const classes = useStyles();
  const { onChange, onValidationChange, question, reflectValidity, responseOptions, value } = props;
  const helperText = question.fields['Helper Text'];
  const isValid = !!value;
  const reflectError = reflectValidity && !isValid;

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  return (
    <FormControl component="fieldset" id={question.id} className={classes.formControl}>
      <FormLabel component="legend" error={reflectError}>
        {question.fields.Label}
      </FormLabel>

      <RadioGroup
        aria-label={question.fields.Label}
        onChange={e => onChange(e.target.value)}
        name={question.id}
        value={value}
      >
        {responseOptions.map(option => (
          <FormControlLabel
            key={option.id}
            id={option.id}
            value={option.id}
            label={option.fields.Name}
            disabled={question.fields.Disabled}
            className={classes.formControlLabel}
            control={<Radio color="primary" />}
            labelPlacement="end"
          />
        ))}
      </RadioGroup>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

RadiosQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  onValidationChange: PropTypes.func.isRequired,
  question: AirtablePropTypes.question.isRequired,
  reflectValidity: PropTypes.bool,
  responseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  value: PropTypes.string,
};

RadiosQuestion.defaultProps = {
  reflectValidity: false,
  value: null,
};
