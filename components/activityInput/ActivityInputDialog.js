import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@material-ui/core/Dialog';
import firebase from 'firebase/app';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
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
import { useAuth } from '../Auth';
import AirtablePropTypes from '../Airtable/PropTypes';
import SubmitSuccess from './SubmitSuccess';
import ToggleButton from '../ToggleButton';
import validate from './ActivityInputValidationRules';

const FORM_ELEMENT_MARGINS = [1, 0];

const useActivityDialogStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
    margin: theme.spacing(...FORM_ELEMENT_MARGINS),
  },
  textField: {
    margin: theme.spacing(...FORM_ELEMENT_MARGINS),
  },
  toggleButton: {
    marginTop: theme.spacing(2),
  },
  menuItem: {
    whiteSpace: 'normal',
  },
}));

const ACTIVITY_TYPES = [
  {
    value: 'openings',
    label: 'Searched for job openings (Indeed, LinkedIn, Monster, CareerBuilder, etc.)',
    category: AirtablePropTypes.TASK_CATEGORIES.apply,
  },
  {
    value: 'application',
    label: 'Completed a job application',
    category: AirtablePropTypes.TASK_CATEGORIES.apply,
  },
  {
    value: 'materials',
    label: 'Worked on marketing materials (resume, cover letter, LinkedIn profile/activity, etc.)',
    category: AirtablePropTypes.TASK_CATEGORIES.marketing,
  },
  {
    value: 'interview-prep',
    label: 'Prepared for an interview',
    category: AirtablePropTypes.TASK_CATEGORIES.apply,
  },
  {
    value: 'networking-irl',
    label: 'Attended a networking event/job fair',
    category: AirtablePropTypes.TASK_CATEGORIES.relationship,
  },
  {
    value: 'networking-virtual',
    label: 'Had a virtual networking interaction (via email, LinkedIn, etc.)',
    category: AirtablePropTypes.TASK_CATEGORIES.relationship,
  },
  {
    value: 'contact',
    label: 'Had a meeting/call with a contact',
    category: AirtablePropTypes.TASK_CATEGORIES.relationship,
  },
  {
    value: 'research-company-industry',
    label: 'Researched a target company/industry',
    category: AirtablePropTypes.TASK_CATEGORIES.research,
  },
  {
    value: 'research-contacts',
    label: 'Researched contacts at target company',
    category: AirtablePropTypes.TASK_CATEGORIES.research,
  },
  {
    value: 'organization',
    label: 'Organized my search & routines',
    category: AirtablePropTypes.TASK_CATEGORIES.mindset,
  },
  {
    value: 'self-care',
    label: 'Self-care to deal with stress of the search',
    category: AirtablePropTypes.TASK_CATEGORIES.mindset,
  },
  {
    value: 'other',
    label: 'Other',
    category: AirtablePropTypes.TASK_CATEGORIES.other,
  },
  {
    value: 'assessment-complete',
    label: 'Completed assessment',
    category: AirtablePropTypes.TASK_CATEGORIES.other,
  },
];

const TIME_SPENT_OPTIONS = [
  {
    label: '15 minutes',
    value: 15,
  },
  {
    label: '30 minutes',
    value: 30,
  },
  {
    label: '1 hour',
    value: 60,
  },
  {
    label: '1.5 hours',
    value: 90,
  },
  {
    label: '2+ hours',
    value: 120,
  },
];

const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'];

const FEELINGS = [
  'Confident',
  'Discouraged',
  'Frustrated',
  'Optimistic',
  'Motivated',
  'Overwhelmed',
];

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

// eslint-disable-next-line sonarjs/cognitive-complexity
function ActivityInputDialog({ fullScreen, show, onClose }) {
  const classes = useActivityDialogStyles();
  const formId = 'activity-input';
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

  const datePickerTheme = createMuiTheme({
    overrides: {
      MuiFormControl: {
        marginNormal: {
          marginTop: theme.spacing(FORM_ELEMENT_MARGINS[0]),
          marginRight: theme.spacing(FORM_ELEMENT_MARGINS[1]),
          marginBottom: theme.spacing(FORM_ELEMENT_MARGINS[0]),
          marginLeft: theme.spacing(FORM_ELEMENT_MARGINS[1]),
        },
      },
    },
  });

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
    const submit = () => {
      setAttemptSubmitting(false);
      setSubmitting(true);
      const increment = firebase.firestore.FieldValue.increment(1);
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        config: {
          activityTypes: ACTIVITY_TYPES,
          feelings: FEELINGS,
        },
        timestamp,
        ...formValues,
      };
      const stats = {
        activityLogEntriesCount: increment,
        activityLogEntriesLatestTimestamp: timestamp,
      };

      userDocRef
        .collection('activityLogEntries')
        .add(data)
        .then(() => {
          setSubmitting(false);
          setSuccess(true);
          userDocRef.set({ stats }, { merge: true });
          window.Intercom('update', { 'last-activity-logged': new Date() });
          window.Intercom('trackEvent', 'logged-activity', {
            type: data.activityTypeLabel,
            description: data.briefDescription,
            difficulty: data.difficultyLevel,
            feelings: data.activityFeeling.join(', '),
            why_i_feel_this_way: data.whyIFeelThisWay,
          });
        })
        .catch(err => {
          setSubmitting(false);
          setError(err.message);
        });
    };

    if (Object.keys(formErrors).length === 0 && attemptSubmitting) {
      submit();
    }
  }, [attemptSubmitting, formErrors, formValues, userDocRef]);

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={show}
      onExited={resetComponent}
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        <Typography variant="h5">Add Activity</Typography>
      </DialogTitle>

      <DialogContent dividers>
        {submitting && <CircularProgress />}
        {!(submitting || success) && (
          <form id={formId}>
            <FormControl className={classes.formControl}>
              <InputLabel error={!!(formErrors && formErrors.activityTypeValue)}>
                Activity
              </InputLabel>
              <Select
                inputProps={{
                  name: 'activityType',
                }}
                error={!!(formErrors && formErrors.activityTypeValue)}
                value={formValues.activityTypeValue}
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

            <TextField
              label="Brief Description"
              value={formValues.briefDescription}
              error={!!(formErrors && formErrors.briefDescription)}
              helperText={(formErrors && formErrors.briefDescription) || null}
              fullWidth
              onChange={e => setFormValues({ ...formValues, briefDescription: e.target.value })}
              className={classes.textField}
              inputProps={{ maxLength: 80 }}
            />

            <TextField
              label="Notes and Reflection"
              value={formValues.description}
              error={!!(formErrors && formErrors.description)}
              helperText={(formErrors && formErrors.description) || null}
              fullWidth
              onChange={e => setFormValues({ ...formValues, description: e.target.value })}
              className={classes.textField}
            />

            <Grid container justify="space-between" alignItems="flex-start" spacing={isXs ? 0 : 3}>
              <Grid item xs={12} sm={6}>
                <MuiThemeProvider theme={datePickerTheme}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      disableFuture
                      fullWidth
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      label="Date Completed"
                      value={formValues.dateCompleted}
                      onChange={date =>
                        setFormValues({ ...formValues, dateCompleted: startOfDay(date) })
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </MuiThemeProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel error={!!(formErrors && formErrors.timeSpentInMinutes)}>
                    Time Spent
                  </InputLabel>
                  <Select
                    inputProps={{
                      name: 'timeSpent',
                    }}
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

            <FormControl className={classes.formControl}>
              <InputLabel error={!!(formErrors && formErrors.difficultyLevel)} shrink>
                Difficulty Level
              </InputLabel>
              <Grid item xs={12} className={classes.toggleButton}>
                <ToggleButton
                  className={classes.toggleButton}
                  options={DIFFICULTY_LEVELS}
                  value={String(formValues.difficultyLevel)}
                  handleChange={e => setFormValues({ ...formValues, difficultyLevel: e })}
                />
              </Grid>
              {formErrors && formErrors.difficultyLevel && (
                <FormHelperText error>{formErrors.difficultyLevel}</FormHelperText>
              )}
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel shrink>This activity made me feel… (select all that apply)</InputLabel>
              <Grid
                className={classes.toggleButton}
                container
                xs={12}
                item
                justify="space-evenly"
                alignItems="center"
                direction="row"
              >
                <ToggleButton
                  options={shuffledFeelings}
                  multiSelect
                  value={formValues.activityFeeling}
                  handleChange={e => setFormValues({ ...formValues, activityFeeling: e })}
                />
              </Grid>
            </FormControl>

            <TextField
              label="Why do you feel this way?"
              multiline
              rows="4"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
              value={formValues.whyIFeelThisWay}
              onChange={e => setFormValues({ ...formValues, whyIFeelThisWay: e.target.value })}
            />
          </form>
        )}
        {error && (
          <Typography color="error" variant="h4">
            Error: {error}
          </Typography>
        )}
        <SubmitSuccess message="Activity added!" show={success} />
      </DialogContent>
      <DialogActions>
        {!success && (
          <Button autoFocus onClick={handleSave} fullWidth color="primary">
            Submit
          </Button>
        )}
        {success && (
          <Button autoFocus onClick={resetComponent} fullWidth color="primary">
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
export { ACTIVITY_TYPES };
