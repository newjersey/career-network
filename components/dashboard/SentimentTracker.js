import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../Auth';
import useIsSentimentSubmittedToday from '../Firebase/useIsSentimentSubmittedToday';

const useStyles = makeStyles(theme => ({
  root: {
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
    userDocRef.collection('sentimentEvents').add(data);
    setHidden(true);
  };

  const sentiments = [
    { emoji: '😎', label: 'Motivated' },
    { emoji: '🤨', label: 'Discouraged' },
    { emoji: '🙂', label: 'Optimistic' },
    { emoji: '😤', label: 'Overwhelmed' },
  ];

  return (
    <>
      <Typography component="h4" variant="h4" align="center">
        What’s your mood today?
      </Typography>
      <Grid container className={classes.root} justify="center" alignItems="center">
        {sentiments.map(sentiment => (
          <EmojiButton {...sentiment} key={sentiment.label} onClick={submitSentiment} />
        ))}
      </Grid>
    </>
  );
};

export default SentimentTracker;
