import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
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
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8),
  },
  container: {
    position: 'relative',
    padding: theme.spacing(4, 4, 4),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 2, 6, 4),
    },
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
}));

export default function SentimentComplete(props) {
  const classes = useStyles();
  const { onClose, value, onClick } = props;

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid
        container
        className={classes.container}
        alignItems="center"
        direction="row"
        justify="space-between"
        spacing={2}
      >
        <Grid item sm={12} md>
          <Typography variant="h6" className={classes.title} gutterBottom>
            {SENTIMENT_TYPES[value].message}
          </Typography>
          <Typography variant="body1">
            Let’s dive right into getting your first daily recommendation started.
          </Typography>
        </Grid>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Grid item xs={12} sm={12} md={3} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button size="large" variant="contained" onClick={onClick} color="primary">
            Start recommendation
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

SentimentComplete.propTypes = {
  onClose: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
