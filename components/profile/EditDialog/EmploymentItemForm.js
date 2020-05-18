import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    fontWeight: 500,
  },
  dash: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(3, 2, 0),
    fontWeight: 500,
    fontSize: 16,
  },
  placeholderText: {
    opacity: 0.3,
    fontWeight: 400,
  },
}));

export const ADD = 'ADD';
export const UPDATE = 'UPDATE';

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

const monthYearIsValid = (month, year) => month && year && `${year}`.match(/^[0-9]{1,2}.[0-9]{2}$/);

function EmploymentItemForm({ handleChange, handleSubmit, values }) {
  const formId = 'employmentItems';
  const classes = useStyles();

  const onSubmit = () => {
    const { startMonth, startYear, endMonth, endYear, org, title } = values;

    const updatedItem = {
      start: monthYearIsValid(startMonth, startYear) ? `${startMonth} ${startYear}` : '',
      end: monthYearIsValid(endMonth, endYear) ? `${endMonth} ${endYear}` : '',
      org,
      title,
    };

    handleSubmit(updatedItem);
  };

  return (
    <>
      <form id={formId} onSubmit={onSubmit}>
        <span>Job Title</span>
        <TextField
          className={classes.textField}
          fullWidth
          id={`${formId}-title`}
          InputLabelProps={{ shrink: true }}
          onChange={event => handleChange('title', event.target.value)}
          placeholder="Enter the Job Title"
          value={values.title}
          variant="outlined"
        />
        <span>Company / Organization</span>
        <TextField
          className={classes.textField}
          fullWidth
          id={`${formId}-org`}
          InputLabelProps={{ shrink: true }}
          inputProps={{ name: 'org' }}
          onChange={event => handleChange('org', event.target.value)}
          placeholder="Enter the Company / Organization Name"
          value={values.org}
          variant="outlined"
        />
        <span>Employment Dates</span>
        <Grid container wrap="nowrap" spacing={1}>
          <Grid item md={3}>
            <Select
              fullWidth
              variant="outlined"
              className={classes.textField}
              inputProps={{ name: 'startMonth', placeholder: 'Month' }}
              id={`${formId}-start-month`}
              value={values.startMonth || ''}
              onChange={event => handleChange('startMonth', event.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <span className={classes.placeholderText}>Month</span>
              </MenuItem>
              {MONTHS.map(startMonth => (
                <MenuItem key={startMonth} value={startMonth}>
                  {startMonth}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item md={3}>
            <TextField
              fullWidth
              variant="outlined"
              className={classes.textField}
              id={`${formId}-start-year`}
              inputProps={{
                name: 'startYear',
              }}
              type="number"
              step={1}
              min={1900}
              max={2099}
              onChange={event => handleChange('startYear', event.target.value)}
              placeholder="Year"
              value={values.startYear}
            />
          </Grid>
          <div className={classes.dash}>–</div>
          <Grid item md={3}>
            <Select
              fullWidth
              variant="outlined"
              className={classes.textField}
              inputProps={{ name: 'endMonth', placeholder: 'Month' }}
              id={`${formId}-end-month`}
              value={values.endMonth || ''}
              onChange={event => handleChange('endMonth', event.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <span className={classes.placeholderText}>Month</span>
              </MenuItem>
              {MONTHS.map(endMonth => (
                <MenuItem key={endMonth} value={endMonth}>
                  {endMonth}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item md={3}>
            <TextField
              fullWidth
              variant="outlined"
              className={classes.textField}
              id={`${formId}-end-year`}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                name: 'endYear',
              }}
              type="number"
              step={1}
              min={1900}
              max={2099}
              onChange={event => handleChange('endYear', event.target.value)}
              placeholder="Year"
              value={values.endYear}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
}

EmploymentItemForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    startYear: PropTypes.string,
    startMonth: PropTypes.string,
    endYear: PropTypes.string,
    endMonth: PropTypes.string,
    title: PropTypes.string,
    org: PropTypes.string,
  }),
};

EmploymentItemForm.defaultProps = {
  values: {
    title: undefined,
    org: undefined,
    startMonth: '',
    endMonth: '',
    startYear: undefined,
    endYear: undefined,
  },
};

export default EmploymentItemForm;
