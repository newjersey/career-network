import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import AuthForm from './AuthForm';

function AuthDialog(props) {
  const { onCancel, fullScreen, open, onSignInSuccessWithAuthResult } = props;

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onCancel}
      aria-labelledby="sign-in-dialog-title"
    >
      <DialogTitle id="sign-in-dialog-title">Sign in</DialogTitle>
      <DialogContent>
        <Divider style={{ marginTop: -8, marginBottom: 25 }} />
        <DialogContentText style={{ maxWidth: 460 }}>
          <Typography gutterBottom>
            Before we get started, please sign in using one of your accounts below.
          </Typography>
          <small>
            We require the use of a Google or Yahoo account to sign up for a NJCN account to ensure
            a simple and secure sign in. With your account, your data is private and secure – we
            only use this information to provide and improve our service.
          </small>
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
