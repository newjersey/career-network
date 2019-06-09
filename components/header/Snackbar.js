import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MaterialSnackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

function Snackbar(props) {
  const { classes, message, onClose } = props;
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);

    onClose && onClose();
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
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default withStyles(styles)(Snackbar);
