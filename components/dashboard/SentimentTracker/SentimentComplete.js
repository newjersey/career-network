import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shuffle from 'lodash/fp/shuffle';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8),
  },
  container: {
    position: 'relative',
    padding: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 4, 6, 4),
    },
  },
  title: {
    fontSize: '1.1rem',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function SentimentComplete(props) {
  const classes = useStyles();
  const { messages, onClose, onPostSubmissionButtonClicked } = props;
  const [shuffledMessages] = useState(shuffle(messages));

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
            {shuffledMessages[0]}
          </Typography>
          <Typography variant="body1">
            Let’s dive right into getting your first daily goal started.
          </Typography>
        </Grid>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Grid item xs={12} sm={12} md={3} style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            size="large"
            variant="contained"
            onClick={onPostSubmissionButtonClicked}
            color="primary"
          >
            Start Goal
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

SentimentComplete.propTypes = {
  onClose: PropTypes.func.isRequired,
  onPostSubmissionButtonClicked: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};
