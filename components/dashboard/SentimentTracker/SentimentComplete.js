import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const SENTIMENT_TYPES = {
  Motivated: {
    message: 'Fantastic! What have you been putting off doing that you could do today?',
  },
  Hopeful: {
    message: 'Great! What’s something new that you could learn today?',
  },
  Okay: {
    message: 'We hear you! Consider what you could do to give your day a boost.',
  },
  Discouraged: {
    message:
      'It’s normal to feel discouraged during your search. What can you do to lift your mood today? Throughout your day proactively address your mood by doing things, such as changing your scenery, calling a loved one, or going for a walk, in order to bring a new perspective to your day.',
  },
  Worried: {
    message:
      'Sometimes your worries about the future can sap your motivation. Consider how you can minimize your worries so that you can make strides in your job search today.',
  },
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(6, 0, 6, 4),
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '1.1rem',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: theme.palette.grey[500],
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(5, 4, 3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 2, 2),
    },
    marginBottom: theme.spacing(8),
  },
}));

export default function SentimentComplete(props) {
  const classes = useStyles();
  const { onClose, value, onClick } = props;

  return (
    <Paper className={classes.paper} elevation={3}>
      <Box position="relative" className={classes.container}>
        <div>
          <Typography variant="h6" className={classes.title} gutterBottom>
            {SENTIMENT_TYPES[value].message}
          </Typography>
          <Typography variant="body1">
            Let’s dive right into getting your first daily recommendation started.
          </Typography>
        </div>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Button variant="contained" onClick={onClick} color="primary">
          Start recommendation
        </Button>
      </Box>
    </Paper>
  );
}

SentimentComplete.propTypes = {
  onClose: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
