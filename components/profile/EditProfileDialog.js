import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
}));

export const ADD = 'ADD';
export const UPDATE = 'UPDATE';

const initialState = {
  'study-field': undefined,
  school: undefined,
  'education-start-year': undefined,
  'education-end-year': undefined,
};
function UpdateEducationDialog({ show, onClose, mode, items, itemIndex }) {
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
        setValues(vals => ({ ...vals, ...items[itemIndex] }));
      } else {
        setValues(vals => ({ ...vals, ...initialState }));
      }
    }
    if (!show) {
      reset();
    }
  }, [show]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    const updatedItems =
      mode === ADD
        ? [...items, values]
        : [...items.slice(0, itemIndex), values, ...items.slice(itemIndex)];

    setError();
    setSuccess();
    setLoading(true);
    try {
      await userDocRef.update({
        'userProfile.educationItems': updatedItems,
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

  return (
    <>
      <Dialog
        maxWidth="sm"
        open={show}
        aria-labelledby="edit-profile-dialog"
        onExited={handleClose}
      >
        <DialogTitle id="edit-profile-dialog" onClose={onClose}>
          <Typography variant="h6">Update Education Experience</Typography>
          <Typography variant="body1" color="textSecondary">
            Lorem ipsum
          </Typography>
        </DialogTitle>
        <DialogContent>
          {loading && <CircularProgress />}
          <SubmitSuccess message="Education updated" show={success} />
          {!(loading || success) && (
            <form id={formId}>
              <span>Major / Field of Study</span>
              <TextField
                className={classes.textField}
                fullWidth
                id={`${formId}-study-field`}
                InputLabelProps={{ shrink: true }}
                inputProps={{ name: 'study-field' }}
                margin="normal"
                onChange={handleChange}
                placeholder="Enter the Major / Field of Study"
                value={values['study-field']}
                variant="outlined"
              />
              <span>School</span>
              <TextField
                className={classes.textField}
                fullWidth
                id={`${formId}-school`}
                InputLabelProps={{ shrink: true }}
                inputProps={{ name: 'school' }}
                margin="normal"
                onChange={handleChange}
                placeholder="Enter the School Name"
                value={values.school}
                variant="outlined"
              />
              <span>Years Attended</span>
              <Grid container wrap="nowrap">
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    className={classes.textField}
                    id={`${formId}-education-start-year`}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ name: 'education-start-year' }}
                    margin="normal"
                    type="number"
                    onChange={handleChange}
                    placeholder="Select Start Year"
                    value={values['education-start-year']}
                  />
                </Grid>
                <div className={classes.dash}>–</div>
                <Grid item md={6}>
                  <TextField
                    className={classes.textField}
                    fullWidth
                    id={`${formId}-education-end-year`}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ name: 'education-end-year' }}
                    margin="normal"
                    onChange={handleChange}
                    placeholder="Select End Year"
                    type="number"
                    value={values['education-end-year']}
                    variant="outlined"
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

UpdateEducationDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf([ADD, UPDATE]).isRequired,
  itemIndex: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      school: PropTypes.string,
      'study-field': PropTypes.string,
      'education-start-year': PropTypes.string,
      'education-end-year': PropTypes.string,
    })
  ),
};

UpdateEducationDialog.defaultProps = {
  itemIndex: null,
  items: [],
};

export default UpdateEducationDialog;
