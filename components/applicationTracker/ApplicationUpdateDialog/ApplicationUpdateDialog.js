import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import firebase from 'firebase/app';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { APPLICATION_STATUS_TYPES } from '../constants';
import { DialogTitle, DialogContent, DialogActions } from '../../DialogComponents';
import { useAuth } from '../../Auth';

const useStyles = makeStyles(theme => ({
  select: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    fontWeight: 500,
  },
  label: {
    fontWeight: 500,
  },
  footer: {
    padding: theme.spacing(2, 3),
  },
}));

function ApplicationUpdateDialog({ open, applicationData, handleClose, documentId }) {
  const classes = useStyles();
  const { userDocRef } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState();
  const [values, setValues] = useState({});
  const formId = 'application-update-form';

  useEffect(() => {
    setValues({
      status: applicationData.currentStatus,
      isActive: applicationData.isActive,
    });
  }, [applicationData.currentStatus, applicationData.isActive]);

  const handleChange = event => {
    event.persist();
    setValues(prevValues => ({ ...prevValues, [event.target.name]: event.target.value }));
  };

  const handleUpdate = async () => {
    const currentIndex = applicationData.currentStatusEntryId;

    const statusEntry = {
      id: currentIndex + 1,
      status: values.status,
      notes: values.notes || '',
      timestamp: new Date(),
    };

    const updates = {
      statusEntries: [...applicationData.statusEntries, statusEntry],
      currentStatusEntryId: currentIndex + 1,
      currentStatus: values.status,
      isActive: values.isActive,
      lastUpdateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    userDocRef
      .collection('applicationLogEntries')
      .doc(documentId)
      .update(updates);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setError();
    setSubmitting(true);
    try {
      await handleUpdate();
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
          <Typography variant="h6" gutterBottom>
            Update Status
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <b>{applicationData.jobTitle}</b> at <b>{applicationData.company}</b>
          </Typography>
        </DialogTitle>
        <DialogContent>
          {submitting && <CircularProgress />}
          <form id={formId} onSubmit={handleSubmit}>
            <span>Status</span>
            <Select
              className={classes.select}
              fullWidth
              displayEmpty
              id={`${formId}-status`}
              inputProps={{ name: 'status' }}
              onChange={handleChange}
              value={values.status}
              variant="outlined"
            >
              {APPLICATION_STATUS_TYPES.map(type => (
                <MenuItem value={type.value} key={type.value}>
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
            <FormControlLabel
              classes={{
                label: classes.label,
              }}
              label="This is an Active Application"
              control={
                <Checkbox
                  checked={values.isActive || false}
                  onChange={event => setValues({ ...values, isActive: event.target.checked })}
                  color="primary"
                />
              }
            />
            {JSON.stringify(values)}
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
    statusEntries: PropTypes.arrayOf(PropTypes.object),
    currentStatusEntryId: PropTypes.number,
    currentStatus: PropTypes.string,
    isActive: PropTypes.bool,
  }),
  documentId: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

ApplicationUpdateDialog.defaultProps = {
  applicationData: {
    jobTitle: '',
    company: '',
    statusEntries: [],
    currentStatusEntryId: null,
    currentStatus: '',
    isActive: null,
  },
  documentId: '',
};

export default ApplicationUpdateDialog;
