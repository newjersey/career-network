import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Select from '@material-ui/core/Select';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import AirtablePropTypes from '../../../Airtable/PropTypes';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  horizontalLabel: {
    fontWeight: 'bolder',
  },
}));

export default function DropdownQuestion(props) {
  const classes = useStyles();
  const {
    horizontalOnDesktop,
    onChange,
    onValidationChange,
    optional,
    question,
    reflectValidity,
    responseOptions,
    value,
  } = props;
  const isDesktop = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const horizontal = horizontalOnDesktop && isDesktop;
  const helperText = question.fields['Helper Text'];
  const isValid = optional || !!value || value === 0;
  const reflectError = reflectValidity && !isValid;

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  const Label = _props => {
    const { LabelComponent } = _props;
    return (
      <LabelComponent
        htmlFor={question.id}
        className={clsx(horizontal && classes.horizontalLabel)}
        error={reflectError}
      >
        {question.fields.Label}
      </LabelComponent>
    );
  };

  const HelperText = () => <FormHelperText>{helperText}</FormHelperText>;

  const Dropdown = () => (
    <Select
      disabled={question.fields.Disabled}
      fullWidth
      inputProps={{
        name: question.id,
        id: question.id,
      }}
      onChange={e => onChange(e.target.value)}
      error={reflectError}
      value={value}
    >
      {responseOptions.map(option => (
        <MenuItem key={option.id} value={option.id}>
          {option.fields.Name}
        </MenuItem>
      ))}
    </Select>
  );

  const Vertical = () => (
    <>
      <Label LabelComponent={InputLabel} />
      <Dropdown />
      {helperText && <HelperText />}
    </>
  );

  const Horizontal = () => (
    <>
      <Label LabelComponent={FormLabel} />
      <Grid container justify="space-between">
        {helperText && (
          <Grid item xs={12} sm={7} md={8}>
            <HelperText />
          </Grid>
        )}
        <Grid item xs={12} sm={4} md={3}>
          <Dropdown />
        </Grid>
      </Grid>
    </>
  );

  return (
    <FormControl className={classes.formControl}>
      {horizontal ? <Horizontal /> : <Vertical />}
    </FormControl>
  );
}

DropdownQuestion.propTypes = {
  horizontalOnDesktop: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onValidationChange: PropTypes.func.isRequired,
  optional: PropTypes.bool.isRequired,
  question: AirtablePropTypes.question.isRequired,
  reflectValidity: PropTypes.bool,
  responseOptions: AirtablePropTypes.questionResponseOptions.isRequired,
  value: PropTypes.string,
};

DropdownQuestion.defaultProps = {
  horizontalOnDesktop: false,
  reflectValidity: false,
  value: null,
};
