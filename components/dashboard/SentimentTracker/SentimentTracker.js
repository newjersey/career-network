import { Flags } from 'react-feature-flags';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import SentimentComplete from './SentimentComplete';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 2, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0.5, 2, 0.8),
    },
    marginBottom: theme.spacing(8),
  },
  buttons: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
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
        <Box align="center">
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
  const { onRecord, onClose, lastRecordedValue, isComplete } = props;
  const classes = useStyles();

  const submitSentiment = sentiment => {
    if (onRecord) {
      onRecord(sentiment);
    }
  };

  const sentiments = [
    {
      emoji: '😩',
      label: 'Worried',
      message:
        'Sometimes your worries about the future can sap your motivation. Consider how you can minimize your worries so that you can make strides in your job search today.',
    },
    {
      emoji: '😔',
      label: 'Discouraged',
      message:
        'It’s normal to feel discouraged during your search. What can you do to lift your mood today? Throughout your day proactively address your mood by doing things, such as changing your scenery, calling a loved one, or going for a walk, in order to bring a new perspective to your day.',
    },
    {
      emoji: '🙂',
      label: 'Okay',
      message: 'We hear you! Consider what you could do to give your day a boost.',
    },
    {
      emoji: '😃',
      label: 'Hopeful',
      message: 'Great! What’s something new that you could learn today?',
    },
    {
      emoji: '😎',
      label: 'Motivated',
      message: 'Fantastic! What have you been putting off doing that you could do today?',
    },
  ];

  return (
    <Flags
      authorizedFlags={['completeSentiment']}
      renderOn={() => (
        <>
          {!isComplete && (
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
          )}
          {isComplete && (
            <SentimentComplete
              message={
                lastRecordedValue &&
                sentiments.find(sentiment => sentiment.label === lastRecordedValue).message
              }
              onClose={onClose}
            />
          )}
        </>
      )}
      renderOff={() => (
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
      )}
    />
  );
};

SentimentTracker.propTypes = {
  onRecord: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  lastRecordedValue: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
};

SentimentTracker.defaultProps = {
  onRecord: null,
  isComplete: false,
};

export default SentimentTracker;
