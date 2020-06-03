import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import StarIcon from '@material-ui/icons/Star';

import { useAuth } from '../../Auth';
import { ACTION_TYPES } from './constants';
import { DialogTitle, DialogContent, DialogActions } from '../../DialogComponents';
import FirebasePropTypes from '../../Firebase/PropTypes';

const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(4, 4, 4),
  },
  title: {
    fontSize: theme.spacing(3),
    color: theme.palette.background.dark,
  },
  itemLabel: {
    display: 'flex',
    alignItems: 'center',
  },
  labelContainer: {
    marginLeft: 5,
  },
  input: {
    width: theme.spacing(10),
  },
}));

function ActionPlanUpdateDialog(props) {
  const classes = useStyles();
  const { userDocRef } = useAuth();
  const { show, handleClose, actionPlan } = props;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState();
  const [values, setValues] = useState({});
  const formId = 'actionPlan';

  const handleChange = event => {
    event.persist();
    setValues(prevValues => ({ ...prevValues, [event.target.name]: event.target.value }));
  };

  const onClose = () => {
    setError();
    setSubmitting(false);
    setValues({});
    handleClose();
  };

  const handleSave = () => {
    const updatedData = {
      goals: (values.goals && parseInt(values.goals, 10)) || actionPlan.goals,
      activities: (values.activities && parseInt(values.activities, 10)) || actionPlan.activities,
      applications:
        (values.applications && parseInt(values.applications, 10)) || actionPlan.applications,
      lastUpdatedTimestamp: new Date(),
    };
    userDocRef.set({ actionPlan: updatedData }, { merge: true });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setError();
    setSubmitting(true);
    try {
      await handleSave();
      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      maxWidth="sm"
      open={show}
      onClose={onClose}
      aria-labelledby="action-plan-dialog"
    >
      <DialogTitle id="action-plan-dialog-title" onClose={onClose}>
        <Typography className={classes.title} variant="h4" gutterBottom>
          Update Action Plan
        </Typography>
        <Typography variant="body2">
          Your Action Plan is your weekly plan to make progress in your job search journey. These
          actions help you take key steps through the New Jersey Career Network. What do you plan to
          complete in a week?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Divider />
        {submitting && <CircularProgress />}
        <form id={formId} onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="space-between" mt={3}>
            <div>
              <span className={classes.itemLabel} style={{ color: ACTION_TYPES.goal.color }}>
                <span>
                  <StarIcon />
                </span>
                <span className={classes.labelContainer}>
                  <Typography variant="body1">Completed Goals</Typography>
                </span>
              </span>
              <div>How many goals do you plan to log in a week?</div>
            </div>
            <TextField
              autoFocus
              className={classes.input}
              id={`${formId}-goals`}
              inputProps={{ name: 'goals', min: 0 }}
              value={values.goals || actionPlan.goals}
              onChange={handleChange}
              variant="outlined"
              type="number"
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mt={3}>
            <div>
              <span className={classes.itemLabel} style={{ color: ACTION_TYPES.activity.color }}>
                <span>
                  <AssignmentTurnedInIcon />
                </span>
                <span className={classes.labelContainer}>
                  <Typography variant="body1">Activities Logged</Typography>
                </span>
              </span>
              <div>How many activities do you plan to log in a week?</div>
            </div>
            <TextField
              autoFocus
              className={classes.input}
              id={`${formId}-activities`}
              inputProps={{ name: 'activities', min: 0 }}
              value={values.activities || actionPlan.activities}
              onChange={handleChange}
              variant="outlined"
              type="number"
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mt={3} mb={3}>
            <div>
              <span className={classes.itemLabel} style={{ color: ACTION_TYPES.application.color }}>
                <span>
                  <NextWeekIcon />
                </span>
                <span className={classes.labelContainer}>
                  <Typography variant="body1">Applications Tracked</Typography>
                </span>
              </span>
              <div>How many applications do you plan to complete in a week?</div>
            </div>
            <TextField
              autoFocus
              className={classes.input}
              id={`${formId}-applications`}
              inputProps={{ name: 'applications', min: 0 }}
              value={values.applications || actionPlan.applications}
              min={0}
              onChange={handleChange}
              variant="outlined"
              type="number"
            />
          </Box>
        </form>
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
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
  );
}

ActionPlanUpdateDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  actionPlan: PropTypes.shape({
    goals: PropTypes.number,
    activities: PropTypes.number,
    applications: PropTypes.number,
    lastUpdatedTimestamp: FirebasePropTypes.timestamp.isRequired,
  }),
};

ActionPlanUpdateDialog.defaultProps = {
  actionPlan: {
    goals: 0,
    activities: 0,
    applications: 0,
    lastUpdatedTimestamp: null,
  },
};

export default withMobileDialog()(ActionPlanUpdateDialog);
