import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(5, 4, 3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 2, 2),
    },
    marginBottom: theme.spacing(8),
  },
  buttons: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    maxWidth: '75%',
  },
  emoji: {
    fontSize: theme.spacing(7),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(6),
    },
  },
}));

const EmojiButton = ({ emoji, label, onClick }) => {
  const classes = useStyles();
  const handleClick = () => {
    onClick({ emoji, label });
  };

  return (
    <Grid item style={{ textAlign: 'center' }}>
      <Button onClick={handleClick} data-intercom={`sentiment-${label.toLowerCase()}`}>
        <Box m={1} align="center">
          <span className={classes.emoji} role="img" aria-label={label}>
            {emoji}
          </span>
          <br />
          {label}
        </Box>
      </Button>
    </Grid>
  );
};

EmojiButton.propTypes = {
  emoji: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const SentimentTracker = props => {
  const { onRecord } = props;
  const { userDocRef } = useAuth();

  const classes = useStyles();

  const submitSentiment = sentiment => {
    const data = {
      timestamp: new Date(),
      ...sentiment,
    };

    userDocRef.collection('sentimentEvents').add(data);
    window.Intercom('trackEvent', 'logged-sentiment', sentiment);
    window.Intercom('update', {
      'last-mood': sentiment.emoji,
      'last-sentiment': sentiment.label,
    });

    if (onRecord) {
      onRecord(sentiment);
    }
  };

  const sentiments = [
    { emoji: '😩', label: 'Worried' },
    { emoji: '😔', label: 'Discouraged' },
    { emoji: '🙂', label: 'Okay' },
    { emoji: '😃', label: 'Hopeful' },
    { emoji: '😎', label: 'Motivated' },
  ];

  return (
    <Paper className={classes.paper} elevation={3} data-intercom="sentiment-container">
      <Grid container direction="row" justify="space-evenly" alignItems="center">
        <Grid item xs={12} sm={3} md={3}>
          <Typography component="h4" variant="h6" align="center">
            How are you feeling today?
          </Typography>
        </Grid>
        <Grid
          xs={12}
          sm={7}
          md={7}
          container
          item
          className={classes.buttons}
          justify="space-between"
          alignItems="center"
        >
          {sentiments.map(sentiment => (
            <EmojiButton {...sentiment} key={sentiment.label} onClick={submitSentiment} />
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

SentimentTracker.propTypes = {
  onRecord: PropTypes.func,
};

SentimentTracker.defaultProps = {
  onRecord: null,
};

export default SentimentTracker;
