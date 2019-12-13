import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import upcomingInterviewFormValidation from './upcomingInterviewFormValidation';
import useFormValidation from './formValidationHook';
import { useAuth } from '../../Auth';
import SubmitSuccess from '../SubmitSuccess';

const INTERVIEW_TYPES = [
  {
    value: 'phone-screen',
    label: 'Phone Interview',
    description:
      'A phone interview, also known as a phone screen, is a short interview conducted over the telephone, which is often used to screen candidates before in-person interviews.',
  },
  {
    value: 'recorded-video',
    label: 'Recorded Video Interview',
    description:
      'A recorded video interview, also known as a one-way interview, is an interview where the interviewer is not present when the candidate records their answers to preset questions.',
  },
  {
    value: 'live-video',
    label: 'Live Video Interview',
    description:
      'A live video interview connects the interviewer and candidate face-to-face on video via webcam.',
  },
  {
    value: 'in-person',
    label: 'In-person Interview',
    description:
      'An in-person interview is a face-to-face meeting between the candidate and the interviewer.',
  },
];

const upcomingInterviewFormValues = {
  type: undefined,
  date: undefined,
  company: undefined,
  role: undefined,
};

const useStyles = makeStyles(theme => ({
  selectItem: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: theme.breakpoints.width('sm'),
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  select: {
    width: '100%',
  },
}));
export default function UpcomingInterviewDialog(props) {
  const formId = 'upcoming-interview';
  const classes = useStyles();
  const { show, onClose } = props;
  const { userDocRef } = useAuth();
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState();
  function submit(values) {
    const increment = firebase.firestore.FieldValue.increment(1);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      ...values,
      type: values.type.value,
      timestamp,
    };
    const stats = {
      interviewLogEntriesCount: increment,
      interviewLogEntriesLatest: timestamp,
    };
    userDocRef
      .collectioni('interviewLogEntries')
      .add(data)
      .then(() => {
        setSuccess(true);
        userDocRef.set({ stats }, { merge: true });
      })
      .catch(err => setSubmitError(err.message));
  }
  const { handleSubmit, handleChange, values, errors, isSubmitting } = useFormValidation(
    upcomingInterviewFormValues,
    upcomingInterviewFormValidation,
    submit
  );

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={show}
      onClose={onClose}
      aria-labelledby="upcoming-interview-dialog"
    >
      <DialogTitle id="upcoming-interview-dialog">Have an upcoming interview?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you have an interview coming up, let us know and we can send helpful guidance on how to
          prepare.
        </DialogContentText>
        <Divider />
        <FormControl className={classes.formControl}>
          <InputLabel shrink id={`${formId}-type-label`}>
            Interview Type
          </InputLabel>
          <Select
            labelid={`${formId}-type-label`}
            className={classes.select}
            id={`${formId}-type`}
            value={values.type}
            inputProps={{ name: 'type' }}
            onChange={handleChange}
            renderValue={t => t.label}
          >
            <MenuItem value={undefined} disabled>
              What kind of interview is it?
            </MenuItem>

            {INTERVIEW_TYPES.map(type => (
              <MenuItem value={type} key={type.value} className={classes.selectItem}>
                <Typography variant="body1" style={{ width: '100%' }}>
                  {type.label}
                </Typography>
                <Typography variant="caption" component="p" style={{ wordBreak: 'break-all' }}>
                  {type.description}
                </Typography>
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={errors.type && errors.type.length > 0}>
            {errors.type}
          </FormHelperText>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.formControl}>
            <KeyboardDatePicker
              id={`${formId}-date`}
              disableToolbar
              disableFuture
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              label="Interview Date"
              value={values.date}
              inputProps={{ name: 'date' }}
              onChange={handleChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <FormControl className={classes.formControl}>
          <TextField
            label="Interview Company"
            id={`${formId}-company`}
            value={values.company}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
            inputProps={{ name: 'company' }}
            placeholder="Who is the interview with?"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id={`${formId}-role`}
            value={values.role}
            label="Role / Position"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
            inputProps={{ name: 'role' }}
            placeholder="What role did you apply for?"
          />
        </FormControl>
        {submitError && (
          <Typography color="error" variant="h4">
            Error: {submitError}
          </Typography>
        )}
        <SubmitSuccess
          message="Thank you for entering...we'll be providing some recommendations"
          show={success}
        />
        {isSubmitting && <CircularProgress />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Let Us Know
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UpcomingInterviewDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
