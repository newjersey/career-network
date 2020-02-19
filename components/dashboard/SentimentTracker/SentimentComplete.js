import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(8, 0, 8, 4),
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: theme.spacing(-9),
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
  const { onClose, user } = props;

  return (
    <Paper className={classes.paper} elevation={3}>
      <Box position="relative">
        <Typography className={classes.title} variant="h6">
          Thank you for sharing, {user}
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
  user: PropTypes.string.isRequired,
};
