import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import { DialogTitle, DialogContent } from '../DialogComponents';

const useStyles = makeStyles({
  dialog: {
    backgroundImage: 'url(/static/img/celebrate-diaglog-background.svg)',
    backgroundSize: 'cover',
  },
});

const MAX_WIDTH = 'xs';

function AssessmentCompleteDialog({ show, onClose }) {
  const classes = useStyles();

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      maxWidth={MAX_WIDTH}
      fullWidth
      onClose={onClose}
      aria-labelledby="assessment-dialog"
      open={show}
      onExited={onClose}
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
        <Typography variant="body2" align="center" style={{ marginBottom: '3em' }}>
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
    </Dialog>
  );
}

AssessmentCompleteDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withMobileDialog()(AssessmentCompleteDialog);
