import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { confetti } from 'dom-confetti';

import { DialogTitle, DialogContent } from './DialogComponents';

const confettiConfig = {
  angle: '90',
  spread: '70',
  startVelocity: 60,
  elementCount: '80',
  dragFriction: 0.1,
  duration: '6500',
  stagger: '1',
  width: '10px',
  height: '16px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

const useStyles = makeStyles(theme => ({
  dialog: {
    backgroundImage: 'url(/static/img/celebrate.svg)',
    backgroundSize: 'cover',
    padding: theme.spacing(2, 6, 4, 6),
    width: '520px',
  },
  confetti: {
    zIndex: 999,
    position: 'fixed',
    left: '50%',
    bottom: '15%',
    transform: 'translateX(-50%)',
  },
}));

const MAX_WIDTH = 'sm';

function CelebrationDialog({ show, onClose }) {
  const classes = useStyles();
  const confettiRef = useRef();

  const throwConfetti = useCallback(() => {
    confetti(confettiRef.current, confettiConfig);
  }, []);

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      onEnter={throwConfetti}
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
          <span
            role="img"
            aria-label="clap-emoji"
            display="inline-block"
            style={{ marginRight: 8 }}
          >
            👏👏
          </span>
          Great Work
          <span role="img" aria-label="clap-emoji" display="inline-block" style={{ marginLeft: 8 }}>
            👏👏
          </span>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" align="center">
          Job searching is hard and we are here to help you achieve your goals. Taking these steps
          forward every day will add up
          <br /> while you are on the journey.
          <p />
          Make sure to treat yourself and do something special and keep your positive momentum
          going.
        </Typography>
      </DialogContent>
      <div className={classes.confetti} ref={confettiRef} />
    </Dialog>
  );
}

CelebrationDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withMobileDialog()(CelebrationDialog);
