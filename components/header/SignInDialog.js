import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import SignInForm from './SignInForm';

function SignInDialog(props) {
  const { onCancel, fullScreen, open } = props;

  return (
    <Dialog fullScreen={fullScreen} open={open} aria-labelledby="sign-in-dialog-title">
      <DialogTitle id="sign-in-dialog-title">Sign in</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We're excited to have you join us!
        </DialogContentText>
        <SignInForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

SignInDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withMobileDialog()(SignInDialog);
