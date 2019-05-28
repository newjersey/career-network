import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MaterialSnackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class Snackbar extends React.Component {
  state = {
    isOpen: true,
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ isOpen: false });
  };

  render() {
    const { classes, message } = this.props;

    return (
      <MaterialSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.isOpen}
        autoHideDuration={6000}
        onClose={this.handleClose}
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
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

Snackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
};

export default withStyles(styles)(Snackbar);
