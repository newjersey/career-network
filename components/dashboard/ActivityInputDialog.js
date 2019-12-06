import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import shuffle from 'lodash/fp/shuffle';

import { useAuth } from '../Auth';
import ToggleButton from '../ToggleButton';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {children}
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

/** ACTIVITY INPUT DIALOG */
const useActivityDialogStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  textField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  toggleButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const ACTIVITY_TYPES = [
  {
    value: 'openings',
    label: 'Searched for job openings (e.g. Indeed, LinkedIn, Monster, CareerBuilder, etc.)',
  },
  {
    value: 'application',
    label: 'Completed job application',
  },
  {
    value: 'materials',
    label:
      'Created, revised, or customized marketing materials (e.g. resume, cover letter, business card, LinkedIn profile, LinkedIn post, etc.)',
  },
  {
    value: 'interview-prep',
    label: 'Prepared for interview',
  },
  {
    value: 'networking-irl',
    label: 'Attend networking event/job fair',
  },
  {
    value: 'networking-virtual',
    label: 'Virtual networking interaction (via email, LinkedIn, etc.)',
  },
  {
    value: 'contact',
    label: 'Meeting/call with contact',
  },
  {
    value: 'research-company-industry',
    label: 'Researched target company/industry',
  },
  {
    value: 'research-contacts',
    label: 'Researched contacts at target company',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const TIME_SPENT_TYPE = [
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

const DIFFICULTY_LEVEL = ['Easy', 'Medium', 'Hard'];

const FEELINGS = [
  'Confident',
  'Discouraged',
  'Frustrated',
  'Optimistic',
  'Motivated',
  'Overwhelmed',
];

const activityFormValues = {
  activityTypeValue: ACTIVITY_TYPES[0].value,
  activityTypeLabel: ACTIVITY_TYPES[0].label,
  description: '',
  dateCompleted: new Date(),
  timeSpentInMinutes: TIME_SPENT_TYPE[0].value,
  difficultyLevel: DIFFICULTY_LEVEL[0],
  activityFeeling: [],
  whyIfeelThisWay: '',
};

const isEmpty = s => {
  return s === undefined || s === null || s === '';
};

function ActivityInputDialog({ show, onClose }) {
  const classes = useActivityDialogStyles();
  const formId = 'activity-input';
  const { userDocRef } = useAuth();
  const [error, setError] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formValues, setFormValues] = useState(activityFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [shuffledFeelings, setShuffledFeelings] = useState(shuffle(FEELINGS));

  const isFormValid = () => {
    setFormErrors({});
    if (isEmpty(formValues.description)) {
      setFormErrors({ ...formErrors, description: 'Field is required.' });
      return false;
    }
    return true;
  };

  const handleSave = () => {
    const data = {
      config: {
        activityTypes: ACTIVITY_TYPES,
        feelings: FEELINGS,
      },
      timestamp: new Date(),
      ...formValues,
    };
    setError();

    if (isFormValid()) {
      setSubmitting(true);
      userDocRef
        .collection('activityLogEntries')
        .add(data)
        .then(() => {
          setSubmitting(false);
          setSuccess(true);
        })
        .catch(err => {
          setSubmitting(false);
          setError(err.message);
        });
    }
  };

  const resetComponent = () => {
    setError();
    setSuccess(false);
    setSubmitting(false);
    setFormValues(activityFormValues);
    setFormErrors({});
    setShuffledFeelings(shuffle(FEELINGS)); // random shuffle of Feeling types.
  };

  return (
    <Dialog
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
          <form className={classes.container} id={formId}>
            <FormControl className={classes.formControl}>
              <InputLabel id={`${formId}-activityType`}>Activity</InputLabel>
              <Select
                id={`${formId}-activityType-select`}
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
                {ACTIVITY_TYPES.map(activity => (
                  <MenuItem key={activity.value} value={activity.value}>
                    {activity.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="description-textfield">
                Description
              </InputLabel>
              <TextField
                id={`${formId}-description-textfield`}
                value={formValues.description}
                error={formErrors && formErrors.description}
                helperText={formErrors && formErrors.description ? formErrors.description : ''}
                fullWidth
                placeholder=" "
                onChange={e => setFormValues({ ...formValues, description: e.target.value })}
                className={classes.textField}
              />
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container className={classes.formControl}>
                <KeyboardDatePicker
                  disableToolbar
                  disableFuture
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id={`${formId}-dateCompleted`}
                  label="Date Completed"
                  value={formValues.dateCompleted}
                  onChange={date => setFormValues({ ...formValues, dateCompleted: date })}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <FormControl className={classes.formControl}>
              <InputLabel id={`${formId}-timeSpent`}>Time Spent</InputLabel>
              <Select
                labelId={`${formId}-timeSpent`}
                id={`${formId}-timeSpent-select`}
                value={formValues.timeSpentInMinutes}
                onChange={e => setFormValues({ ...formValues, timeSpentInMinutes: e.target.value })}
              >
                {TIME_SPENT_TYPE.map(timeSpentType => (
                  <MenuItem key={timeSpentType.label} value={timeSpentType.value}>
                    {timeSpentType.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl} id={`${formId}-difficultyLevel-radio`}>
              <Typography variant="caption" color="textSecondary">
                Difficulty Level
              </Typography>
              <Grid item xs={12} md={6} className={classes.toggleButton}>
                <ToggleButton
                  options={DIFFICULTY_LEVEL}
                  value={String(formValues.difficultyLevel)}
                  handleChange={e => setFormValues({ ...formValues, difficultyLevel: e })}
                />
              </Grid>
            </FormControl>
            <FormControl className={classes.formControl} id={`${formId}-feelings`}>
              <Typography variant="caption" color="textSecondary">
                This Activity Made Me Feel … (Select All that Apply)
              </Typography>
              <Grid
                container
                xs={12}
                item
                justify="space-evenly"
                alignItems="center"
                direction="row"
                className={classes.toggleButton}
              >
                <ToggleButton
                  options={shuffledFeelings}
                  multiSelect
                  value={String(formValues.activityFeeling)}
                  handleChange={e => setFormValues({ ...formValues, activityFeeling: e })}
                />
              </Grid>
            </FormControl>
            <TextField
              id={`${formId}-whyIfeelThisWay-textfield`}
              label="Why Do You Feel This Way"
              multiline
              rows="4"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
              value={formValues.whyIfeelThisWay}
              onChange={e => setFormValues({ ...formValues, whyIfeelThisWay: e.target.value })}
            />
          </form>
        )}
        {error && (
          <Typography color="error" variant="h4">
            Error: {error}
          </Typography>
        )}
        {success && (
          <Grid container direction="column" justify="center" alignItems="center">
            <CheckCircleIcon style={{ fontSize: 100, color: 'green' }} />
            <Typography variant="h4">Activity added!</Typography>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        {!success && (
          <Button autoFocus onClick={handleSave} color="primary">
            Submit
          </Button>
        )}
        {success && (
          <Button autoFocus onClick={resetComponent} color="primary">
            Add Another Activity
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

ActivityInputDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withMobileDialog()(ActivityInputDialog);
