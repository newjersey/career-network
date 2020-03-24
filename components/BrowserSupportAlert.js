import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const useStyles = makeStyles({
  link: {
    fontWeight: 500,
    color: '#1881c5',
    marginRight: '1em',
    marginBottom: '1em',
  },
});

function BrowserSupportAlert() {
  const classes = useStyles();

  return (
    <Dialog open aria-labelledby="browser-alert-title">
      <DialogTitle id="browser-alert-title">Browser Not Supported</DialogTitle>
      <DialogContent>
        <DialogContentText id="browser-alert-description">
          New Jersey Career Network is currently not supported by your browser. In order for us to
          give you the best experience using this platform, we encourage you to use the latest
          version of <strong>Google Chrome</strong> or <strong>Microsoft Edge</strong>.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Link href="https://www.google.com/chrome/">
          <Typography className={classes.link}>DOWNLOAD CHROME</Typography>
        </Link>
        <Link href="https://www.microsoft.com/en-us/edge">
          <Typography className={classes.link}>DOWNLOAD EDGE</Typography>
        </Link>
      </DialogActions>
    </Dialog>
  );
}

export default withMobileDialog()(BrowserSupportAlert);
