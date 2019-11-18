// Conceptual capabilities of this component should be limited to:
//  - provide sign in screen
//  - provide sign out action
//  - provide user (is signed in/out)

import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useFirebase } from '../Firebase';
import AuthContext from './AuthContext';
import AuthDialog from './AuthDialog';
import User from '../../src/User';

export default function AuthProvider(props) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  // Becomes true very soon after page load; false means we're searching
  // for a Firebase auth session that may or may not exist.
  const [isAuthKnown, setIsAuthKnown] = useState(false);
  const [wasSignedIn, setWasSignedIn] = useState(false);
  const authListener = useRef();
  const userListener = useRef();
  const { auth, db } = useFirebase();

  const showSignIn = () => {
    setIsOpen(true);
    window.Intercom('trackEvent', 'sign-in-form-opened');
  };

  const hideSignIn = () => {
    setIsOpen(false);
    window.Intercom('trackEvent', 'sign-in-form-closed');
  };

  const userDocument = useCallback(
    uid => db.collection(process.env.firebase.userCollection).doc(uid),
    [db]
  );
  const userPreauthorizationDocument = useCallback(
    email => db.collection(process.env.firebase.userPreauthorizationCollection).doc(email),
    [db]
  );

  // Store user data in Firestore.
  const persistUserDataFromAuthResult = async authResult => {
    try {
      const { additionalUserInfo, user: _user } = authResult;
      const { metadata, uid } = _user;
      const { creationTime, lastSignInTime } = metadata;

      const { displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL } = _user;

      const authProfile = {
        displayName,
        email,
        emailVerified,
        isAnonymous,
        phoneNumber,
        photoURL,
      };

      const authProviders = {};
      authProviders[additionalUserInfo.providerId] = additionalUserInfo.profile;

      const userData = {
        authProfile,
        authProviders,
        creationTimestamp: new Date(creationTime),
        lastSignInTimestamp: new Date(lastSignInTime),
        lastUpdateTimestamp: new Date(),
      };

      const preAuthDoc = await userPreauthorizationDocument(email).get();
      const preAuthData = preAuthDoc.exists ? preAuthDoc.data() : {};

      userDocument(uid).set({ ...userData, ...preAuthData }, { merge: true });
    } catch (error) {
      // TODO: better error UX, and reporting solution
      // eslint-disable-next-line no-alert
      alert(`There was a problem signing in:\n\n${error.message}`);
      throw error;
    }
  };

  const handleSignInSuccessWithAuthResult = authResult => {
    setIsOpen(false);
    persistUserDataFromAuthResult(authResult);
  };

  // Clear or set user ID upon auth state change.
  useEffect(() => {
    authListener.current = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        setIsOpen(false);
        setUserId(authUser.uid);
      } else {
        // preserve ordering:
        setUserId(null);
        setIsAuthKnown(true);
      }
    });

    return () => {
      if (typeof authListener.current === 'function') {
        authListener.current();
      }

      authListener.current = null;
    };
  }, [auth]);

  // Listen for user object (and changes to it), when we have a user ID.
  useEffect(() => {
    if (userId) {
      const userDocRef = userDocument(userId);

      userListener.current = userDocRef.onSnapshot(
        userSnapshot => {
          // wait for data to persist (first login)
          if (userSnapshot.exists) {
            // preserve this ordering:
            setUser(new User(userSnapshot));
            setWasSignedIn(true);
            setIsAuthKnown(true);
          }
        },
        error => {
          // eslint-disable-next-line no-alert
          alert(`There was a problem signing in:\n\n${error.message}`);
          throw error;
        }
      );
    } else {
      setUser(null);
    }

    return () => {
      if (typeof userListener.current === 'function') {
        userListener.current();
      }

      userListener.current = null;
    };
  }, [userDocument, userId]);

  const value = {
    isAuthKnown,
    showSignIn,
    signOut: () => auth().signOut(),
    user,
    userDocRef: user && userDocument(user.uid),
    wasSignedIn,
  };

  return (
    <React.Fragment>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

      <AuthDialog
        open={isOpen}
        onCancel={hideSignIn}
        onSignInSuccessWithAuthResult={handleSignInSuccessWithAuthResult}
      />
    </React.Fragment>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
