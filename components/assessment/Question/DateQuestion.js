import { makeStyles } from '@material-ui/styles';
import InfoIcon from '@material-ui/icons/Info';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import AirtablePropTypes from '../../Airtable/PropTypes';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    fontWeight: 500,
    maxWidth: 180,
  },
  helperText: {
    display: 'flex',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    backgroundColor: theme.palette.background.header,
    margin: theme.spacing(0.5, 0),
    padding: theme.spacing(1),
  },
  year: {
    marginLeft: theme.spacing(1),
  },
  monthSelect: {
    minWidth: 180,
  },
  disabled: {
    fontWeight: 400,
    color: theme.palette.text.hint,
  },
  root: {
    display: 'flex',
  },
}));

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function DateQuestion(props) {
  const classes = useStyles();
  const {
    onChange,
    onChangeCommitted,
    optional,
    onValidationChange,
    question,
    reflectValidity,
    value,
  } = props;
  const isValid = optional || !!value;
  const reflectError = reflectValidity && !isValid;
  const helperText = question.fields['Helper Text'];

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  // BEGIN
  const initialValue = value && value.length > 0 ? value.split(' ') : undefined;

  // if value is null, then don't set initial for inputs
  const [selectedDate, setSelectedDate] = useState(
    initialValue
      ? {
          month: initialValue[0],
          year: initialValue[1],
        }
      : {}
  );
  const [selectedYear, setSelectedYear] = useState(selectedDate[1]);

  const handleYearChange = newYear => {
    setSelectedYear(newYear);
    setSelectedDate(prevValues => ({ ...prevValues, year: newYear }));
  };

  const handleYearCommit = newYear => {
    // If the year field is left incomplete or blank, set the month & year value to empty
    if (!newYear || newYear.length < 1) {
      onChangeCommitted('');
    }
  };

  const handleMonthChange = newMonth => {
    setSelectedDate(prevValues => ({ ...prevValues, month: newMonth }));
  };

  useEffect(() => {
    onChange(selectedDate);
    if (selectedDate.month && selectedYear && selectedYear.length === 4) {
      onChangeCommitted(`${selectedDate.month} ${selectedDate.year}`);
    }
  }, [selectedDate]);

  return (
    <>
      <span>{question.fields.Label}</span>
      <div className={classes.root}>
        <Select
          error={reflectError}
          displayEmpty
          disabled={question.fields.Disabled}
          value={selectedDate && selectedDate.month !== undefined ? selectedDate.month : ''}
          variant="outlined"
          FormHelperTextProps={{ classes: { root: classes.helperText } }}
          helperText={
            helperText && (
              <>
                <InfoIcon color="primary" style={{ fontSize: '1.2rem', marginRight: '0.5rem' }} />
                <span>{helperText}</span>
              </>
            )
          }
          className={clsx(classes.textField, classes.monthSelect)}
          onChange={event => handleMonthChange(event.target.value)}
        >
          <MenuItem value="">
            <span className={classes.disabled}>Month</span>
          </MenuItem>
          {MONTHS.map(m => (
            <MenuItem value={m}>{m}</MenuItem>
          ))}
        </Select>
        <TextField
          disabled={question.fields.Disabled}
          error={reflectError}
          type="number"
          min={1900}
          max={2099}
          FormHelperTextProps={{ classes: { root: classes.helperText } }}
          step={1}
          className={clsx(classes.textField, classes.year)}
          variant="outlined"
          placeholder="Year"
          fullWidth
          inputProps={{ maxlength: '4', type: 'text', pattern: 'd*' }}
          value={selectedYear}
          onBlur={e => handleYearCommit(e.target.value)}
          onChange={e => handleYearChange(e.target.value)}
        />
      </div>
    </>
  );
}

DateQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  onChangeCommitted: PropTypes.func.isRequired,
  onValidationChange: PropTypes.func.isRequired,
  optional: PropTypes.bool.isRequired,
  question: AirtablePropTypes.question.isRequired,
  reflectValidity: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

DateQuestion.defaultProps = {
  reflectValidity: false,
};
