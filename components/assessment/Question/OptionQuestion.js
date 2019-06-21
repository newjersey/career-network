import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import Select from '@material-ui/core/Select';

import AirtablePropTypes from '../../Airtable/PropTypes';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
  },
}));

export default function OptionQuestion(props) {
  const classes = useStyles();
  const {
    onChange,
    question,
    responseOptions,
    value,
  } = props;

  const helperText = question.fields['Helper Text'];

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={question.id}>{question.fields.Label}</InputLabel>
      <Select
        inputProps={{
          name: question.id,
          id: question.id,
        }}
        onChange={e => onChange(e.target.value)}
        value={value}
      >
        {responseOptions.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.fields.Name}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

OptionQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  question: AirtablePropTypes.question.isRequired,
  responseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  value: PropTypes.string,
};

OptionQuestion.defaultProps = {
  value: null,
};
