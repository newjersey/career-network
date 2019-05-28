import PropTypes from 'prop-types';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { withFirebase } from '../Firebase';

function SignInForm(props) {
  const { firebase } = props;

  return (
    <StyledFirebaseAuth uiConfig={firebase.uiConfig} firebaseAuth={firebase.auth} />
  );
}

SignInForm.propTypes = {
  firebase: PropTypes.object.isRequired,
};

export default withFirebase(SignInForm);
