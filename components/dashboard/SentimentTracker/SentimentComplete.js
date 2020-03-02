import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8),
  },
  container: {
    padding: theme.spacing(6, 4, 6, 5),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 2, 6, 4),
    },
  },
  title: {
    maxWidth: '75%',
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
  const { onClose, message } = props;

  return (
    <Paper className={classes.paper} elevation={3}>
      <Box position="relative" className={classes.container}>
        <Typography variant="h6" className={classes.title} gutterBottom>
          {message}
        </Typography>
        <Typography variant="body1">
          Here is one place to get started. Take action on your first recommended activity.
          Let&apos;s dive in together!
        </Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

SentimentComplete.propTypes = {
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
