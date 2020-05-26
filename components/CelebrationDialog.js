import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import { DialogTitle, DialogContent } from './DialogComponents';

const useStyles = makeStyles(theme => ({
  dialog: {
    backgroundImage: 'url(/static/img/celebrate.svg)',
    backgroundSize: 'cover',
    padding: theme.spacing(2, 6, 4, 6),
    width: '520px',
  },
  button: {
    margin: theme.spacing(2, 0, 2, 0),
  },
  textButton: {
    textDecoration: 'underline',
    textTransform: 'none',
    fontWeight: 'bold',
  },
}));

const MAX_WIDTH = 'sm';

function CelebrationDialog({ show, onClose }) {
  const classes = useStyles();

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      maxWidth={MAX_WIDTH}
      onClose={onClose}
      aria-labelledby="celebration-dialog"
      open={show}
    >
      <DialogTitle id="celebration-dialog-title" onClose={onClose}>
        <Typography variant="body1" align="center" style={{ marginTop: '3em' }}>
          Weekly Action Plan Completed
        </Typography>
        <Typography variant="h2" align="center">
          <span role="img" aria-label="clap-emoji">
            {' '}
            👏👏
          </span>
          Great Work
          <span role="img" aria-label="clap-emoji">
            {' '}
            👏👏
          </span>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" align="center">
          Job searching is hard and we are here to help you achieve your goals. Taking these steps
          forward every day will add up while you are on the journey.
          <br />
          Make sure to treat yourself and do something special and keep your positive momentum
          going.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

CelebrationDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withMobileDialog()(CelebrationDialog);
