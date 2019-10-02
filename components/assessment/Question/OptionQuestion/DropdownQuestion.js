import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Select from '@material-ui/core/Select';

import AirtablePropTypes from '../../../Airtable/PropTypes';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  questionLabel: {
    fontSize: '1.2em',
    fontWeight: 'bolder',
  },
  helperText: {
    marginTop: theme.spacing(0.5),
    fontSize: '1em',
  },
}));

export default function DropdownQuestion(props) {
  const classes = useStyles();
  const { onChange, question, responseOptions, value } = props;
  const helperText = question.fields['Helper Text'];

  return (
    <FormControl className={classes.formControl}>
      <Grid container justify="space-between">
        <Grid item md={12} sm={12}>
          <Typography className={classes.questionLabel}>{question.fields.Label}</Typography>
        </Grid>
        {helperText && (
          <Grid item md={8} sm={7} xs={12}>
            <Grid item md={11}>
              <FormHelperText className={classes.helperText}>{helperText}</FormHelperText>
            </Grid>
          </Grid>
        )}
        <Grid item md={3} sm={4} xs={8} align="right">
          <Select
            disabled={question.fields.Disabled}
            inputProps={{
              name: question.id,
              id: question.id,
            }}
            align="left"
            fullWidth
            onChange={e => onChange(e.target.value)}
            value={value}
          >
            {responseOptions.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.fields.Name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </FormControl>
  );
}

DropdownQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  question: AirtablePropTypes.question.isRequired,
  responseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  value: PropTypes.string,
};

DropdownQuestion.defaultProps = {
  value: null,
};
