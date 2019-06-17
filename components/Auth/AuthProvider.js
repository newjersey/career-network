import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import AuthContext from './AuthContext';
import AuthDialog from './AuthDialog';
import useFirebase from '../Firebase/useFirebase';
import User from '../../src/User';

export default function AuthProvider(props) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [wasSignedIn, setWasSignedIn] = useState(false);
  const cleanupRef = useRef();
  const firebase = useFirebase();

  const handleCancel = () => setIsOpen(false);

  // Set user, but in the future (TODO): just store user profile in Firestore.
  const handleSignInSuccessWithAuthResult = (authResult) => {
    setIsOpen(false);
    setUser(new User(authResult));
    setWasSignedIn(true);
  };

  /*
    Listen for logouts.
    We don't listen for logins the same way, because the callback
    argument authUser does not contain as much rich data as the
    argument to handleSignInSuccessWithAuthResult (authResult).
    However, with this, we lose sticky sessions across page reloads.
    Ideally, we would create a profile for the user upon sign up
    using the rich data from handleSignInSuccessWithAuthResult(authResult)
    and retrieve that profile in the future, rather than listen for
    handleSignInSuccessWithAuthResult(authResult) every time.
  */

  // Clear user, but in the future (TODO): also set user, pulling profile from Firestore.
  useEffect(() => {
    (async () => {
      // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
      cleanupRef.current = await firebase.auth().onAuthStateChanged((authUser) => {
        if (!authUser) {
          setUser(null);
        }
      });
    })();

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  }, [firebase]);


  const value = {
    showSignIn: () => setIsOpen(true),
    signOut: () => firebase.auth().signOut(),
    user,
    wasSignedIn,
  };

  return (
    <React.Fragment>
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>

      <AuthDialog
        open={isOpen}
        onCancel={handleCancel}
        onSignInSuccessWithAuthResult={handleSignInSuccessWithAuthResult}
      />
    </React.Fragment>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
