import React, { useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import upcomingInterviewFormValidation from './UpcomingInterviewValidationRules';
import useFormValidation from './formValidationHook';
import { useAuth } from '../../Auth';
import SubmitSuccess from '../SubmitSuccess';
import { DialogContent, DialogTitle } from '../../DialogComponents';

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

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    marginTop: theme.spacing(2),
  },
  selectItem: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    maxWidth: theme.breakpoints.width('sm'),
    whiteSpace: 'normal',
  },
  divider: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
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

    const { type, ...formData } = values;
    const data = {
      ...formData,
      type: type.value,
      timestamp,
    };
    const stats = {
      interviewLogEntriesCount: increment,
      interviewLogEntriesLatest: timestamp,
    };

    userDocRef
      .collection('interviewLogEntries')
      .add(data)
      .then(() => {
        setSuccess(true);
        userDocRef.set({ stats }, { merge: true });
      })
      .catch(err => setSubmitError(err.message));
  }

  const {
    handleSubmit,
    handleChange,
    handleChangeCustom,
    values,
    errors,
    isSubmitting,
    reset,
  } = useFormValidation({}, upcomingInterviewFormValidation, submit);

  return (
    <Dialog fullWidth open={show} aria-labelledby="upcoming-interview-dialog" onExited={reset}>
      <DialogTitle id="upcoming-interview-dialog" onClose={onClose}>
        <Typography variant="h6" className={classes.dialogTitle}>
          Have an upcoming interview?
        </Typography>
        <Typography variant="body1" color="textSecondary">
          If you have an interview coming up, let us know and we can send helpful guidance on how to
          prepare.
        </Typography>
      </DialogTitle>
      <Divider className={classes.divider} />
      <DialogContent>
        <SubmitSuccess
          message="Thank you for entering...we'll be providing some recommendations"
          show={success}
        />
        {!(success || isSubmitting) && (
          <form id={formId}>
            <FormControl fullWidth error={!!errors.type}>
              <InputLabel shrink>Interview Type</InputLabel>
              <Select
                displayEmpty
                id={`${formId}-type`}
                inputProps={{ name: 'type' }}
                MenuProps={{
                  anchorOrigin: {
                    horizontal: 'left',
                    vertical: 'bottom',
                  },
                  getContentAnchorEl: null,
                }}
                onChange={handleChange}
                renderValue={t =>
                  t ? (
                    t.label
                  ) : (
                    <Typography variant="body1" color="textSecondary">
                      What kind of interview is it?
                    </Typography>
                  )
                }
                value={values.type || ''}
              >
                {INTERVIEW_TYPES.map(type => (
                  <MenuItem value={type} key={type.value} className={classes.selectItem}>
                    <Typography variant="body1">{type.label}</Typography>
                    <Typography variant="caption" style={{ wordBreak: 'break-word' }}>
                      {type.description}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText margin="dense">{errors.type}</FormHelperText>
            </FormControl>
            <FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  color="textSecondary"
                  disablePast
                  disableToolbar
                  error={!!errors.date}
                  format="MM/dd/yyyy"
                  helperText={errors.date}
                  id={`${formId}-date`}
                  InputLabelProps={{ shrink: true }}
                  KeyboardButtonProps={{ 'aria-label': 'change date' }}
                  label="Interview Date"
                  margin="normal"
                  onChange={d => handleChangeCustom('date', d)}
                  placeholder="When is your interview?"
                  value={values.date || null}
                  variant="inline"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
            <TextField
              error={!!errors.company}
              fullWidth
              helperText={errors.company}
              id={`${formId}-company`}
              InputLabelProps={{ shrink: true }}
              inputProps={{ name: 'company' }}
              label="Interview Company"
              margin="normal"
              onChange={handleChange}
              placeholder="Who is the interview with?"
              value={values.company}
            />
            <TextField
              error={!!errors.role}
              fullWidth
              helperText={errors.role}
              id={`${formId}-role`}
              InputLabelProps={{ shrink: true }}
              inputProps={{ name: 'role' }}
              label="Role / Position"
              margin="normal"
              onChange={handleChange}
              placeholder="What role did you apply for?"
              value={values.role}
            />
            <Box my={2}>
              <Button fullWidth variant="contained" onClick={handleSubmit} color="primary">
                Let Us Know
              </Button>
            </Box>
          </form>
        )}
        {submitError && (
          <Typography color="error" variant="h6">
            Error: {submitError}
          </Typography>
        )}
      </DialogContent>
      <Box
        display={isSubmitting ? 'flex' : 'none'}
        position="absolute"
        width={1}
        height={1}
        bgcolor="background.paper"
        justifyContent="center"
        alignItems="center"
        style={{ opacity: 0.6 }}
      >
        <CircularProgress />
      </Box>
    </Dialog>
  );
}

UpcomingInterviewDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
