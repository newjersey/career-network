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
  'Attended Job Fair',
  'Attended Networking Event',
  'Call/Meeting with Recruiter',
  'Completed online application',
  'Created/revised marketing materials (business card, LinkedIn profile, etc.)',
  'Customized resume/cover letter for specific job opening',
  'Informational Interview',
  'Interacted on LinkedIn (messaged or made new contact, commented on a post/article)',
  'Looked for/reviewed job openings (Indeed, LinkedIn, Monster, CareerBuilder, etc.)',
  'Meeting/Call with Contact',
  'Posted on LinkedIn (shared link, wrote a post, wrote an article)',
  'Prepared for interview ',
  'Researched contacts at target company',
  'Researched target company/industry',
  'Other',
];

const TIME_SPENT_TYPE = [
  {
    label: '30 minutes',
    value: 30,
  },
  {
    label: '60 minutes',
    value: 60,
  },
  {
    label: '90 minutes',
    value: 90,
  },
  {
    label: '120+ minutes',
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

// random shuffle of Feeling types.
FEELINGS.sort(() => {
  return 0.5 - Math.random();
});

const activityFormValues = {
  activityType: ACTIVITY_TYPES[0],
  description: undefined,
  dateCompleted: new Date(),
  timeSpent: TIME_SPENT_TYPE[0].value,
  difficultyLevel: DIFFICULTY_LEVEL[0],
  activityFeeling: [],
};

function ActivityInputDialog({ show, onClose }) {
  const classes = useActivityDialogStyles();
  const formId = 'activity-input';
  const { userDocRef } = useAuth();
  const [error, setError] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formValues, setFormValues] = useState(activityFormValues);

  const handleSave = () => {
    const data = {
      timestamp: new Date(),
      ...formValues,
    };
    setError();
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
  };

  return (
    <Dialog fullWidth onClose={onClose} aria-labelledby="customized-dialog-title" open={show}>
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
                labelId={`${formId}-activityType`}
                id="activityType-select"
                value={formValues.activityType}
                onChange={e => setFormValues({ ...formValues, activityType: e.target.value })}
              >
                {ACTIVITY_TYPES.map(activity => (
                  <MenuItem key={activity} value={activity}>
                    {activity}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="description-textfield">
                Description
              </InputLabel>
              <TextField
                id="description-textfield"
                value={formValues.description}
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
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id={`${formId}--dateCompleted`}
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
                id="timeSpent-select"
                value={formValues.timeSpent}
                onChange={e => setFormValues({ ...formValues, timeSpent: e.target.value })}
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
                  value={formValues.difficultyLevel}
                  handleChange={e => setFormValues({ ...formValues, difficultyLevel: e })}
                />
              </Grid>
            </FormControl>
            <FormControl className={classes.formControl} id={`${formId}-feelings`}>
              <Typography variant="caption" color="textSecondary">
                This activity made me feel...
              </Typography>
              <Grid xs={12} md={6} className={classes.toggleButton}>
                <ToggleButton
                  options={FEELINGS}
                  multiSelect
                  value={formValues.activityFeeling}
                  handleChange={e => setFormValues({ ...formValues, activityFeeling: e })}
                />
              </Grid>
            </FormControl>
          </form>
        )}
        {error && (
          <Typography color="error" variant="h4">
            Error: {error}
          </Typography>
        )}
        {success && (
          <Grid container direction="column" justify="center" alignItems="center">
            <CheckCircleIcon style={{ fontSize: 200, color: 'green' }}> </CheckCircleIcon>
            <Typography variant="h4">Success!</Typography>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSave} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ActivityInputDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ActivityInputDialog;
