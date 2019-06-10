import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import useFirebase from './useFirebase';

export default function SignInForm() {
  const firebase = useFirebase();

  return (
    <StyledFirebaseAuth uiConfig={firebase.uiConfig} firebaseAuth={firebase.auth} />
  );
}
