import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import AuthForm from './AuthForm';

function AuthDialog(props) {
  const {
    onCancel,
    fullScreen,
    open,
    onSignInSuccessWithAuthResult,
  } = props;

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onCancel}
      aria-labelledby="sign-in-dialog-title"
    >
      <DialogTitle id="sign-in-dialog-title">Sign in</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We’re excited to have you join us!
        </DialogContentText>
        <AuthForm onSignInSuccessWithAuthResult={onSignInSuccessWithAuthResult} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

AuthDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSignInSuccessWithAuthResult: PropTypes.func,
};

AuthDialog.defaultProps = {
  onSignInSuccessWithAuthResult: null,
};

export default withMobileDialog()(AuthDialog);
