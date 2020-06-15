import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import React, { useEffect, useState } from 'react';
import AirtablePropTypes from '../../Airtable/PropTypes';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    fontWeight: 500,
  },
  helperText: {
    display: 'flex',
    width: '100%',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    backgroundColor: theme.palette.background.header,
    margin: theme.spacing(0.5, 0),
    padding: theme.spacing(1),
  },
  year: {
    maxWidth: 180,
    marginLeft: theme.spacing(1),
  },
  monthSelect: {
    minWidth: 180,
  },
  disabled: {
    fontWeight: 400,
    color: theme.palette.text.hint,
  },
  label: {
    width: '100%',
  },
  group: {
    display: 'flex',
    flexWrap: 'wrap',
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

const isValidMonthYear = ({ month, year }) => {
  const yearVal = parseInt(year, 10);
  return MONTHS.includes(month) && yearVal > 1900 && yearVal < 2100;
};

export default function MonthYearQuestion(props) {
  const classes = useStyles();
  const {
    onChange,
    onChangeCommitted,
    optional,
    onValidationChange,
    question,
    value,
    groupIsValid,
    reflectValidity,
    isLastInGroup,
  } = props;
  const initialValue = value && value.length > 0 ? value.split(' ') : undefined;
  const [selectedDate, setSelectedDate] = useState(
    initialValue
      ? {
          month: initialValue[0],
          year: initialValue[1],
        }
      : {}
  );
  const [selectedYear, setSelectedYear] = useState(selectedDate.year);
  const isValid =
    (optional && !selectedDate.month && !selectedDate.year) || isValidMonthYear(selectedDate);
  const reflectError = reflectValidity && (!isValid || !groupIsValid);
  const errorMessage =
    isLastInGroup && !groupIsValid
      ? 'Please enter a valid date range.'
      : 'Please enter valid month and year.';

  useEffect(() => {
    onValidationChange(isValid, value);
  }, [isValid, onValidationChange, value]);

  const handleYearChange = newYear => {
    setSelectedYear(newYear);
    setSelectedDate(prevValues => ({ ...prevValues, year: newYear }));
  };

  const handleMonthChange = newMonth => {
    setSelectedDate(prevValues => ({ ...prevValues, month: newMonth }));
  };

  useEffect(() => {
    // Only persist date if both are filled in
    if (selectedDate.month && selectedDate.year) {
      onChangeCommitted(`${selectedDate.month} ${selectedDate.year}`);
    }
    onChange(selectedDate);
  }, [selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.group}>
      <span className={classes.label}>{question.fields.Label}</span>
      <FormControl className={classes.formControl} error={reflectError}>
        <div className={classes.group}>
          <Select
            disabled={question.fields.Disabled}
            displayEmpty
            className={classes.monthSelect}
            error={reflectError}
            onChange={event => handleMonthChange(event.target.value)}
            value={selectedDate.month || ''}
            variant="outlined"
          >
            <MenuItem value="">
              <span className={classes.disabled}>Month</span>
            </MenuItem>
            {MONTHS.map(month => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
          <TextField
            className={classes.year}
            disabled={question.fields.Disabled}
            error={reflectError}
            FormHelperTextProps={{ classes: { root: classes.helperText } }}
            fullWidth
            inputProps={{ maxLength: 4, type: 'text', pattern: 'd*' }}
            max={2099}
            min={1900}
            onChange={e => handleYearChange(e.target.value)}
            placeholder="Year"
            step={1}
            type="number"
            value={selectedYear || ''}
            variant="outlined"
          />
        </div>
        {reflectError && isLastInGroup && <FormHelperText error>{errorMessage}</FormHelperText>}
      </FormControl>
    </div>
  );
}

MonthYearQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  onChangeCommitted: PropTypes.func.isRequired,
  onValidationChange: PropTypes.func.isRequired,
  optional: PropTypes.bool.isRequired,
  question: AirtablePropTypes.question.isRequired,
  value: PropTypes.string.isRequired,
  isLastInGroup: PropTypes.bool,
  reflectValidity: PropTypes.bool,
  groupIsValid: PropTypes.bool,
};

MonthYearQuestion.defaultProps = {
  groupIsValid: true,
  reflectValidity: false,
  isLastInGroup: false,
};
