import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
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
  const [value, setValue] = useState('');
  const { question, answerOptions } = props;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={question.id}>{question.fields.Name}</InputLabel>
      <Select
        value={value}
        onChange={event => setValue(event.target.value)}
        inputProps={{
          name: question.id,
          id: question.id,
        }}
      >
        {answerOptions.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.fields.Name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

OptionQuestion.propTypes = {
  question: AirtablePropTypes.question.isRequired,
  answerOptions: AirtablePropTypes.questionAnswerOptions.isRequired,
};
