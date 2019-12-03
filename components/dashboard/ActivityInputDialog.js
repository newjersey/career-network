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
import { useAuth } from '../Auth';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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

const activityFormValues = {
  activityType: ACTIVITY_TYPES[0],
};

function ActivityInputDialog({ show, onClose }) {
  const classes = useActivityDialogStyles();
  const formId = 'activity-input';
  const { userDocRef } = useAuth();
  const [formValues, setFormValues] = useState(activityFormValues);

  const handleSave = () => {
    const data = {
      timestamp: new Date(),
      activityType: 'my activity',
    };
    userDocRef.collection('activityLogEntries').add(data);
    onClose();
  };

  return (
    <div>
      <Dialog fullWidth onClose={onClose} aria-labelledby="customized-dialog-title" open={show}>
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          Add Activity
        </DialogTitle>
        <DialogContent dividers>
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
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ActivityInputDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ActivityInputDialog;
