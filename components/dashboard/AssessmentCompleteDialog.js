import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import { DialogTitle, DialogContent, DialogActions } from '../DialogComponents';

const useStyles = makeStyles(theme => ({
  dialog: {
    backgroundImage: 'url(/static/img/celebrate.svg)',
    backgroundSize: 'cover',
    padding: theme.spacing(2, 6, 4, 6),
    width: '40%',
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    margin: theme.spacing(2, 0, 2, 0),
  },
  textButton: {
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
}));

const MAX_WIDTH = 'sm';

function AssessmentCompleteDialog({ show, onClose }) {
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
        <Typography variant="h2" align="center" style={{ fontWeight: 700 }}>
          Welcome to New Jersey Career Network
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" align="center">
          Thank you for joining the New Jersey Career Network! This is a massive step on your career
          journey.
          <br />
          <br />
          We’ve created a series of activities and milestones that will help you land your next
          position.
          <br />
          <br />
          Get started by exploring the basics of a job search.
        </Typography>
      </DialogContent>
      <DialogActions className={classes.actionContainer}>
        <NextLink href="/job-search-basics">
          <Button className={classes.button} variant="contained" color="primary" fullWidth>
            Explore Job Search Basics
          </Button>
        </NextLink>
        <div>
          <span style={{ fontSize: 14 }}>Want to see everything we have?</span>
          <Button className={classes.textButton} color="primary" onClick={onClose}>
            EXPLORE NJCN
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

AssessmentCompleteDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withMobileDialog()(AssessmentCompleteDialog);
