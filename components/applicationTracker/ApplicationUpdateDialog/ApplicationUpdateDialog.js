import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { DialogTitle, DialogContent, DialogActions } from '../../DialogComponents';

const APPLICATION_INITIAL_STATE = {
  jobTitle: '',
  company: '',
  dateApplied: '',
  notes: '',
};

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    fontWeight: 500,
  },
  footer: {
    padding: theme.spacing(2, 3),
  },
}));

const APPLICATION_STATUS_TYPES = [
  {
    value: 'submitted',
    label: 'Application Submitted',
  },
  {
    value: 'phone-screen',
    label: 'Phone Screen',
  },
  {
    value: 'interview',
    label: 'Interviews',
  },
  {
    value: 'offer-received',
    label: 'Offer Received',
  },
  {
    value: 'in-negation',
    label: 'In Negation',
  },
  {
    value: 'offer-accepted',
    label: 'Offer Accepted',
  },
  {
    value: 'offer-rejected',
    label: 'Offer Rejected',
  },
];

function ApplicationUpdateDialog({ open, applicationData, handleClose, handleSave }) {
  const classes = useStyles();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState();
  const [values, setValues] = useState(applicationData);
  const formId = 'application-form';

  const handleChange = event => {
    event.persist();
    setValues(prevValues => ({ ...prevValues, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setError();
    setSubmitting(true);
    try {
      await handleSave(values);
      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="application-update-dialog">
        <DialogTitle id="application-update-dialog" onClose={handleClose}>
          <Typography variant="h6">Update Status</Typography>
        </DialogTitle>
        <DialogContent>
          {submitting && <CircularProgress />}
          <form id={formId} onSubmit={handleSubmit}>
            <span>Status</span>
            <Select
              fullWidth
              displayEmpty
              id={`${formId}-update-status`}
              inputProps={{ name: 'status' }}
              onChange={handleChange}
              value={values.currentStatus}
            >
              {APPLICATION_STATUS_TYPES.map(type => (
                <MenuItem value={type} key={type.value}>
                  <Typography variant="body1">{type.label}</Typography>
                </MenuItem>
              ))}
            </Select>
            <span>Note</span>
            <TextField
              autoFocus
              className={classes.textField}
              fullWidth
              id={`${formId}-notes`}
              InputLabelProps={{ shrink: true }}
              inputProps={{ name: 'notes' }}
              multiline
              onChange={handleChange}
              placeholder="Add any notes for future reference."
              rows={4}
              type="text"
              value={values.notes}
              variant="outlined"
            />
          </form>
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions className={classes.footer}>
          <Button
            color="primary"
            fullWidth
            type="submit"
            form={formId}
            size="large"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ApplicationUpdateDialog.propTypes = {
  applicationData: PropTypes.shape({
    jobTitle: PropTypes.string,
    company: PropTypes.string,
    dateApplied: PropTypes.string,
    notes: PropTypes.string,
    currentStatus: PropTypes.string,
  }),
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
};

ApplicationUpdateDialog.defaultProps = {
  applicationData: APPLICATION_INITIAL_STATE,
};

export default ApplicationUpdateDialog;
