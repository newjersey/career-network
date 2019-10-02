import React, { useRef, useState } from 'react';
import { confetti } from 'dom-confetti';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../Auth';
import useIsSentimentSubmittedToday from '../Firebase/useIsSentimentSubmittedToday';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  confetti: {
    zIndex: 999,
    position: 'fixed',
    left: '50%',
    bottom: '35%',
    transform: 'translateX(-50%)',
  },
  grid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  emoji: {
    fontSize: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(7),
    },
  },
}));

const EmojiButton = ({ emoji, label, onClick }) => {
  const classes = useStyles();
  return (
    <Grid item lg={2} md={3} sm={3} xs={6} style={{ textAlign: 'center' }}>
      <Button onClick={() => onClick(label)}>
        <Typography align="center">
          <span className={classes.emoji} role="img" aria-label={label}>
            {emoji}
          </span>
          <br />
          {label}
        </Typography>
      </Button>
    </Grid>
  );
};

EmojiButton.propTypes = {
  emoji: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const SentimentTracker = () => {
  const { userDocRef } = useAuth();
  const [hidden, setHidden] = useState(false);
  const confettiRef = useRef();
  const isAlreadySubmittedToday = useIsSentimentSubmittedToday();

  const classes = useStyles();
  if (isAlreadySubmittedToday || hidden) {
    return null;
  }

  const submitSentiment = sentiment => {
    const data = {
      timestamp: new Date(),
      sentiment,
    };
    confetti(confettiRef.current);
    userDocRef
      .collection('sentimentEvents')
      .add(data)
      .then(() => {
        setHidden(true);
      });
  };
  return (
    <Card>
      <Grid container className={classes.grid} justify="center" alignItems="center">
        <div className={classes.confetti} ref={confettiRef} />
        <Grid item xs={12}>
          <Typography component="h5" variant="h5" style={{ textAlign: 'center' }}>
            What`s your mood today?
          </Typography>
        </Grid>

        <EmojiButton emoji="😎" label="Motivated" onClick={submitSentiment} />
        <EmojiButton emoji="🤨" label="Discouraged" onClick={submitSentiment} />
        <EmojiButton emoji="🙂" label="Optimistic" onClick={submitSentiment} />
        <EmojiButton emoji="😤" label="Overwhelmed" onClick={submitSentiment} />
      </Grid>
    </Card>
  );
};

export default SentimentTracker;
