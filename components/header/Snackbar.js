import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MaterialSnackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

function Snackbar(props) {
  const { message, onClose } = props;
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <MaterialSnackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

Snackbar.defaultProps = {
  onClose: undefined,
};

export default Snackbar;
