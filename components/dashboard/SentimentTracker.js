import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';
import { useSnackbar } from '../Snackbar';
import useIsSentimentSubmittedToday from '../Firebase/useIsSentimentSubmittedToday';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(5, 4, 3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 5, 4),
    },
  },
  buttons: {
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
  const handleClick = () => {
    onClick({ emoji, label });
  };

  return (
    <Grid item lg={2} md={3} sm={3} xs={6} style={{ textAlign: 'center' }}>
      <Button onClick={handleClick} data-intercom={`sentiment-${label.toLowerCase()}`}>
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
  const showMessage = useSnackbar();
  const { user } = useAuth();

  const classes = useStyles();
  if (isAlreadySubmittedToday || hidden) {
    return null;
  }

  const submitSentiment = sentiment => {
    const data = {
      timestamp: new Date(),
      ...sentiment,
    };

    userDocRef.collection('sentimentEvents').add(data);
    window.Intercom('trackEvent', 'logged-sentiment', sentiment);
    showMessage(`Thank you for sharing, ${user.firstName}`);
    setHidden(true);
  };

  const sentiments = [
    { emoji: '😎', label: 'Motivated' },
    { emoji: '😔', label: 'Discouraged' },
    { emoji: '🙂', label: 'Optimistic' },
    { emoji: '😤', label: 'Overwhelmed' },
  ];

  return (
    <Paper className={classes.paper}>
      <Typography component="h4" variant="h4" align="center">
        How are you feeling today?
      </Typography>
      <Grid container className={classes.buttons} justify="center" alignItems="center">
        {sentiments.map(sentiment => (
          <EmojiButton {...sentiment} key={sentiment.label} onClick={submitSentiment} />
        ))}
      </Grid>
    </Paper>
  );
};

export default SentimentTracker;
