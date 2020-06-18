import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import firebase from 'firebase/app';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import shuffle from 'lodash/fp/shuffle';
import startOfDay from 'date-fns/startOfDay';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import { DialogTitle, DialogContent, DialogActions } from '../DialogComponents';
import { useAnalytics } from '../Analytics';
import { useAuth } from '../Auth';
import SubmitSuccess from './SubmitSuccess';
import ToggleButton from '../ToggleButton';
import DateInput from '../DateInput';
import validate from './ActivityInputValidationRules';
import { ACTIVITY_TYPES, TIME_SPENT_OPTIONS, DIFFICULTY_LEVELS, FEELINGS } from './constants';

const useActivityDialogStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
    margin: theme.spacing(1, 0, 0, 0),
    minHeight: 108,
  },
  inputField: {
    margin: theme.spacing(1, 0, 0, 0),
  },
  toggleButtonGroup: {
    marginTop: theme.spacing(2),
  },
  menuItem: {
    whiteSpace: 'normal',
  },
  toggleButton: {
    flexBasis: 'calc(100%/3)',
    flex: 1,
    marginRight: 0,
    paddingTop: 0,
  },
  labelWithSub: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  dialogActions: {
    padding: theme.spacing(2, 3),
  },
  difficultyButton: {
    color: theme.palette.background.dark,
    '&.toggleButton-0': {
      backgroundColor: '#fbe6aa',
    },
    '&.toggleButton-1': {
      backgroundColor: '#f8cb98',
    },
    '&.toggleButton-2': {
      backgroundColor: '#ec9996',
    },
  },
  dialogTitle: {
    marginTop: theme.spacing(4),
  },
}));

const initialFormValues = {
  activityTypeValue: '',
  activityTypeLabel: '',
  description: '',
  briefDescription: '',
  dateCompleted: startOfDay(new Date()),
  timeSpentInMinutes: '',
  difficultyLevel: '',
  activityFeeling: [],
  whyIFeelThisWay: '',
};

export async function logActivity(userDocRef, activityDetails) {
  const data = {
    config: {
      activityTypes: ACTIVITY_TYPES,
      feelings: FEELINGS,
    },
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    ...activityDetails,
  };

  return userDocRef.collection('activityLogEntries').add(data);
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function ActivityInputDialog({ fullScreen, show, onClose }) {
  const classes = useActivityDialogStyles();
  const formId = 'activity-input';
  const analytics = useAnalytics();
  const { userDocRef } = useAuth();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const [error, setError] = useState();
  const [attemptSubmitting, setAttemptSubmitting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [shuffledFeelings, setShuffledFeelings] = useState(shuffle(FEELINGS));

  const activitiesForInput = ACTIVITY_TYPES.filter(
    activity => activity.value !== 'assessment-complete'
  );

  const handleSave = () => {
    setError();
    setAttemptSubmitting(true);
    setFormErrors(validate(formValues));
  };

  const resetComponent = () => {
    setError();
    setSuccess(false);
    setAttemptSubmitting(false);
    setSubmitting(false);
    setFormValues(initialFormValues);
    setFormErrors({});
    setShuffledFeelings(shuffle(FEELINGS)); // random shuffle of Feeling types.
  };

  useEffect(() => {
    const submit = async () => {
      setAttemptSubmitting(false);
      setSubmitting(true);

      try {
        await logActivity(userDocRef, formValues);
        setSuccess(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setSubmitting(false);
      }

      const stats = {
        activityLogEntriesCount: firebase.firestore.FieldValue.increment(1),
        activityLogEntriesLatestTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };

      const weeklyStats = {
        activities: firebase.firestore.FieldValue.increment(1),
        activitiesLatestTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };

      userDocRef.set({ stats, weeklyStats }, { merge: true });
      analytics.trackEvent('logged-activity', {
        type: formValues.activityTypeLabel,
        description: formValues.briefDescription,
        difficulty: formValues.difficultyLevel,
        feelings: formValues.activityFeeling.join(', '),
        why_i_feel_this_way: formValues.whyIFeelThisWay,
      });
    };

    if (Object.keys(formErrors).length === 0 && attemptSubmitting) {
      submit();
    }
  }, [analytics, attemptSubmitting, formErrors, formValues, userDocRef]);

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={show}
      onExited={resetComponent}
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose} className={classes.dialogTitle}>
        <Typography variant="h5" gutterBottom>
          Log an Activity
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Our research suggests jobseekers who track their progress land their next role faster. The
          activity log allows you to track your job search activities even outside of this platform.
        </Typography>
      </DialogTitle>

      <DialogContent>
        {submitting && <CircularProgress />}
        {!(submitting || success) && (
          <form id={formId}>
            <FormControl className={classes.formControl}>
              <span>Activity Type</span>
              <Select
                inputProps={{
                  name: 'activityType',
                }}
                className={classes.inputField}
                error={!!(formErrors && formErrors.activityTypeValue)}
                value={formValues.activityTypeValue}
                variant="outlined"
                onChange={e =>
                  setFormValues({
                    ...formValues,
                    activityTypeValue: e.target.value,
                    activityTypeLabel: ACTIVITY_TYPES.find(
                      activityType => activityType.value === e.target.value
                    ).label,
                  })
                }
              >
                {activitiesForInput.map(activity => (
                  <MenuItem
                    key={activity.value}
                    value={activity.value}
                    className={classes.menuItem}
                  >
                    {activity.label}
                  </MenuItem>
                ))}
              </Select>
              {formErrors && formErrors.activityTypeValue && (
                <FormHelperText error>{formErrors.activityTypeValue}</FormHelperText>
              )}
            </FormControl>

            <FormControl className={classes.formControl}>
              <span>Activity Title</span>
              <TextField
                variant="outlined"
                value={formValues.briefDescription}
                error={!!(formErrors && formErrors.briefDescription)}
                fullWidth
                onChange={e => setFormValues({ ...formValues, briefDescription: e.target.value })}
                className={classes.inputField}
                inputProps={{ maxLength: 80 }}
              />
              {formErrors && formErrors.briefDescription && (
                <FormHelperText error>{formErrors.briefDescription}</FormHelperText>
              )}
            </FormControl>

            <Grid container justify="space-between" alignItems="flex-start" spacing={isXs ? 0 : 3}>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <span>Dates</span>
                  <DateInput
                    value={formValues.dateCompleted}
                    disableFuture
                    onChange={date =>
                      setFormValues(prevValues => ({
                        ...prevValues,
                        dateCompleted: startOfDay(date),
                      }))
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <span>Time Spent</span>
                  <Select
                    variant="outlined"
                    inputProps={{
                      name: 'timeSpent',
                    }}
                    className={classes.inputField}
                    error={!!(formErrors && formErrors.timeSpentInMinutes)}
                    value={formValues.timeSpentInMinutes}
                    onChange={e =>
                      setFormValues({ ...formValues, timeSpentInMinutes: e.target.value })
                    }
                  >
                    {TIME_SPENT_OPTIONS.map(timeSpentOption => (
                      <MenuItem key={timeSpentOption.label} value={timeSpentOption.value}>
                        {timeSpentOption.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors && formErrors.timeSpentInMinutes && (
                    <FormHelperText error>{formErrors.timeSpentInMinutes}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} className={classes.toggleButtonGroup}>
                <FormControl className={classes.formControl}>
                  <span>Difficulty Level</span>
                  <ToggleButton
                    buttonVariant="outlined"
                    selectedButtonVariant="contained"
                    classNameOverrides={{
                      containedPrimary: classes.difficultyButton,
                    }}
                    containerProps={{ className: classes.difficultyButtonContainer }}
                    buttonClassName={classes.toggleButton}
                    options={DIFFICULTY_LEVELS}
                    value={String(formValues.difficultyLevel)}
                    handleChange={e => setFormValues({ ...formValues, difficultyLevel: e })}
                  />
                  {formErrors && formErrors.difficultyLevel && (
                    <FormHelperText error>{formErrors.difficultyLevel}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <div className={classes.labelWithSub}>
                    <Typography variant="body2">I Felt...</Typography>
                    <Typography variant="caption" color="textSecondary">
                      (Select All that Apply)
                    </Typography>
                  </div>
                  <ToggleButton
                    options={shuffledFeelings}
                    multiSelect
                    buttonVariant="outlined"
                    selectedButtonVariant="contained"
                    buttonClassName={classes.toggleButton}
                    value={formValues.activityFeeling}
                    handleChange={e => setFormValues({ ...formValues, activityFeeling: e })}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <FormControl className={classes.formControl}>
              <span>Notes & Reflection</span>
              <TextField
                variant="outlined"
                value={formValues.description}
                error={!!(formErrors && formErrors.description)}
                fullWidth
                multiline
                rows={3}
                onChange={e => setFormValues({ ...formValues, description: e.target.value })}
                className={classes.inputField}
              />
              {formErrors && formErrors.description && (
                <FormHelperText error>{formErrors.description}</FormHelperText>
              )}
            </FormControl>
          </form>
        )}
        {error && (
          <Typography color="error" variant="h4">
            Error: {error}
          </Typography>
        )}
        <SubmitSuccess message="Activity added!" show={success} />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        {!success && (
          <Button
            autoFocus
            onClick={handleSave}
            fullWidth
            color="primary"
            size="large"
            variant="contained"
          >
            Submit
          </Button>
        )}
        {success && (
          <Button
            autoFocus
            onClick={resetComponent}
            fullWidth
            color="primary"
            size="large"
            variant="contained"
          >
            Add Another Activity
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

ActivityInputDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withMobileDialog()(ActivityInputDialog);
