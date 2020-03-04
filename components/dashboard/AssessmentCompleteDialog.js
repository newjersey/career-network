import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import { DialogTitle, DialogContent, DialogActions } from '../DialogComponents';

const useStyles = makeStyles(theme => ({
  dialog: {
    backgroundImage: 'url(/static/img/celebrate.svg)',
    backgroundSize: 'cover',
    padding: theme.spacing(2, 6, 2, 6),
    width: '520px',
  },
  button: {
    margin: theme.spacing(1, 2, 5, 2),
  },
}));

const MAX_WIDTH = 'sm';

function AssessmentCompleteDialog({ show, onClose, onClick }) {
  const classes = useStyles();

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      maxWidth={MAX_WIDTH}
      onClose={onClose}
      aria-labelledby="assessment-dialog"
      open={show}
    >
      <DialogTitle id="assessment-dialog-title" onClose={onClose}>
        <Typography variant="body1" align="center" style={{ marginTop: '3em' }}>
          You’ve Completed Your Profile
        </Typography>
        <Typography variant="h2" align="center">
          Welcome to New Jersey Career Network
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" align="center">
          Thank you for joining the New Jersey Career Network! This is a massive step on your career
          journey.
          <br />
          <br />
          Research suggests that job seekers who track their progress are more successful and land
          their next position faster.
          <br />
          <br />
          Start tracking your progress now by adding search activities you&apos;ve completed in the
          past week to your Activity Log!
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={onClick}
          fullWidth
        >
          Log an Activity
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AssessmentCompleteDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withMobileDialog()(AssessmentCompleteDialog);
