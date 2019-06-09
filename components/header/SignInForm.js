import PropTypes from 'prop-types';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Firebase, { withFirebase } from '../Firebase';

function SignInForm(props) {
  const { firebase } = props;

  return (
    <StyledFirebaseAuth uiConfig={firebase.uiConfig} firebaseAuth={firebase.auth} />
  );
}

SignInForm.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
};

export default withFirebase(SignInForm);
