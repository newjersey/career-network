import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

const color = '#FFFFFF';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#333333',
    textAlign: 'center',
    color,
    padding: theme.spacing(0.5, 0),
  },
  link: {
    color,
    textDecoration: 'underline',
  },
}));

export default function StatusBar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const str1 = 'This site is in alpha and a ';
  const str2 = 'work in progress';

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <Typography variant="caption">
        {str1}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          className={classes.link}
          component="button"
          variant="caption"
          onClick={() => {
            handleClickOpen();
          }}
        >
          {str2}
        </Link>
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {str1}
          {str2}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The Garden State Career Network is in alpha. You are welcome
            to sign-up and use this website, but please be aware that we
            are actively building the site and it may change. If you notice
            anything that doesn’t work or have any feedback, please
            {' '}
            <Link href="mailto:careers@gardenstate.tech?subject=Website Feedback">
              contact us
            </Link>
            .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
