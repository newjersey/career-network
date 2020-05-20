/* eslint-disable sonarjs/cognitive-complexity */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FullPageProgress from '../../FullPageProgress';
import { useAuth } from '../../Auth';
import { DialogContent, DialogTitle, DialogActions } from '../../DialogComponents';
import EmploymentItemForm from './EmploymentItemForm';
import EducationItemForm from './EducationItemForm';

export const ADD = 'ADD';
export const UPDATE = 'UPDATE';

export const DIALOGS = {
  EDIT_EDUCATION: 'educationItems',
  EDIT_EMPLOYMENT: 'employmentItems',
};

const useStyles = makeStyles(() => ({
  content: {
    minHeight: 400,
  },
}));

function EditDialog({ show, onClose, mode, name, items, itemIndex }) {
  const classes = useStyles();
  const { userDocRef } = useAuth();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [values, setValues] = useState();

  const handleChange = event => {
    event.persist();

    setValues(prevValues => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const reset = () => {
    setValues();
    setError();
    setLoading(false);
    setSuccess(false);
  };

  useEffect(() => {
    // If dialog is open and values have not been initialized
    if (show && !values && mode === UPDATE) {
      if (name === DIALOGS.EDIT_EMPLOYMENT) {
        const { start = '', end = '', title = '', org = '' } = items[itemIndex];
        const [startMonth, startYear] = start.split(' ');
        const [endMonth, endYear] = end.split(' ');
        setValues({
          title,
          org,
          startYear,
          startMonth,
          endYear,
          endMonth,
        });
      } else {
        setValues(items[itemIndex]);
      }
    } else if (!show) {
      reset();
    }
  }, [show, name]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async updatedItem => {
    setError();
    setSuccess();
    setLoading(true);

    const updatedItems =
      mode === ADD
        ? [...items, updatedItem]
        : [...items.slice(0, itemIndex), updatedItem, ...items.slice(itemIndex + 1)];

    try {
      await userDocRef.update({
        [`userProfile.${name}`]: updatedItems,
        lastUpdateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setSuccess(true);
      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    if (!show) return null;
    if (name === DIALOGS.EDIT_EDUCATION) {
      return (
        <EducationItemForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          values={values}
        />
      );
    }
    if (name === DIALOGS.EDIT_EMPLOYMENT) {
      return (
        <EmploymentItemForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          values={values}
        />
      );
    }
    return null;
  };

  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={show}
        aria-labelledby="edit-profile-dialog"
        onExited={handleClose}
      >
        <DialogTitle id="edit-profile-dialog" onClose={onClose}>
          <Typography variant="h6">
            Update {name === DIALOGS.EDIT_EDUCATION ? 'Education' : 'Employment'} Experience
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.content}>
          {loading && <FullPageProgress />}
          {!(loading || success) && renderForm()}
          {error && (
            <Typography color="error" variant="h4">
              Error: {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          {!success && (
            <Button
              color="primary"
              fullWidth
              type="submit"
              form={name}
              size="large"
              variant="contained"
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

EditDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf([ADD, UPDATE]).isRequired,
  name: PropTypes.oneOf([DIALOGS.EDIT_EDUCATION, DIALOGS.EDIT_EMPLOYMENT]),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
      title: PropTypes.string,
      org: PropTypes.string,
      school: PropTypes.string,
      'study-field': PropTypes.string,
      'education-start-year': PropTypes.string,
      'education-end-year': PropTypes.string,
    })
  ),
  itemIndex: PropTypes.number,
};

EditDialog.defaultProps = {
  itemIndex: null,
  items: [],
  name: null,
};
export default EditDialog;
