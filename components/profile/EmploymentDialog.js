import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SubmitSuccess from '../activityInput/SubmitSuccess';
import { useAuth } from '../Auth';
import { DialogContent, DialogTitle, DialogActions } from '../DialogComponents';

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

const initialState = {
  title: undefined,
  org: undefined,
  startMonth: '',
  endMonth: '',
  startYear: undefined,
  endYear: undefined,
};

function EmploymentDialog({ show, onClose, mode, items, itemIndex }) {
  const formId = 'edit-profile';
  const classes = useStyles();
  const { userDocRef } = useAuth();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [values, setValues] = useState({});

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const reset = () => {
    setValues({});
    setError();
    setLoading(false);
    setSuccess(false);
  };

  useEffect(() => {
    if (show && Object.keys(values) < 1) {
      if (mode === UPDATE) {
        const { start, end, ...rest } = items[itemIndex];
        const [startMonth, startYear] = start.split(' ');
        const [endMonth, endYear] = end.split(' ');
        setValues(vals => ({
          ...vals,
          ...rest,
          startYear,
          startMonth,
          endYear,
          endMonth,
        }));
      } else {
        setValues(vals => ({ ...vals, ...initialState }));
      }
    }
    if (!show) {
      reset();
    }
  }, [show]);

  const handleSubmit = async () => {
    const { startMonth, startYear, endMonth, endYear, ...rest } = values;
    const start = ` ${startMonth} ${startYear}`;
    const end = ` ${startMonth} ${startYear}`;

    const updatedItems =
      mode === ADD
        ? [...items, { start, end, ...rest }]
        : [...items.slice(0, itemIndex), { start, end, ...rest }, ...items.slice(itemIndex)];

    setError();
    setSuccess();
    setLoading(true);
    try {
      await userDocRef.update({
        lastUpdateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
        'userProfile.employmentItems': updatedItems,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Dialog
        maxWidth="sm"
        open={show}
        aria-labelledby="edit-employment-dialog"
        onExited={handleClose}
      >
        <DialogTitle id="edit-profile-dialog" onClose={onClose}>
          <Typography variant="h6">Update Employment Experience</Typography>
          <Typography variant="body1" color="textSecondary">
            Lorem ipsum
          </Typography>
        </DialogTitle>
        <DialogContent>
          {loading && <CircularProgress />}
          <SubmitSuccess message="Employment updated" show={success} />
          {!(loading || success) && (
            <form id={formId}>
              <span>Job Title</span>
              <TextField
                className={classes.textField}
                fullWidth
                id={`${formId}-title`}
                InputLabelProps={{ shrink: true }}
                inputProps={{ name: 'title' }}
                margin="normal"
                onChange={handleChange}
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
                margin="normal"
                onChange={handleChange}
                placeholder="Enter the Company / Organization Name"
                value={values.org}
                variant="outlined"
              />
              <span>Dates</span>
              <Grid container wrap="nowrap" spacing={1}>
                <Grid item md={3}>
                  <Select
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ name: 'startMonth', placeholder: 'Month' }}
                    id={`${formId}-start-month`}
                    value={values.startMonth}
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      <span className={classes.placeholderText}>Month</span>
                    </MenuItem>
                    {MONTHS.map(month => (
                      <MenuItem value={month}>{month}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item md={3}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    className={classes.textField}
                    id={`${formId}-start-year`}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ name: 'startYear' }}
                    margin="normal"
                    type="number"
                    onChange={handleChange}
                    placeholder="Year"
                    value={values.startYear}
                  />
                </Grid>
                <div className={classes.dash}>–</div>
                <Grid item md={3}>
                  <Select
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ name: 'endMonth', placeholder: 'Month' }}
                    id={`${formId}-end-month`}
                    value={values.endMonth}
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      <span className={classes.placeholderText}>Month</span>
                    </MenuItem>
                    {MONTHS.map(month => (
                      <MenuItem value={month}>{month}</MenuItem>
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
                    inputProps={{ name: 'endYear' }}
                    margin="normal"
                    type="number"
                    onChange={handleChange}
                    placeholder="Year"
                    value={values.endYear}
                  />
                </Grid>
              </Grid>
            </form>
          )}
          {error && (
            <Typography color="error" variant="h4">
              Error: {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          {!success && (
            <Button
              onClick={handleSubmit}
              color="primary"
              fullWidth
              size="large"
              variant="contained"
            >
              Save
            </Button>
          )}
          {success && (
            <Button
              onClick={handleClose}
              color="primary"
              fullWidth
              size="large"
              variant="contained"
            >
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

EmploymentDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf([ADD, UPDATE]).isRequired,
  itemIndex: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
      title: PropTypes.string,
      org: PropTypes.string,
    })
  ),
};

EmploymentDialog.defaultProps = {
  itemIndex: null,
  items: [],
};

export default EmploymentDialog;
