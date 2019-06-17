import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import AuthContext from './AuthContext';
import AuthDialog from './AuthDialog';
import User from '../../src/User';
import { useFirebase } from '../Firebase';

export default function AuthProvider(props) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [wasSignedIn, setWasSignedIn] = useState(false);
  const cleanupRef = useRef();
  const { auth, db } = useFirebase();

  const handleCancel = () => setIsOpen(false);

  // Store user data in Firestore.
  const handleSignInSuccessWithAuthResult = (authResult) => {
    setIsOpen(false);

    try {
      const { additionalUserInfo, user: _user } = authResult;
      const { uid } = _user;
      const doc = db.collection('users').doc(uid);

      const {
        displayName,
        email,
        emailVerified,
        isAnonymous,
        phoneNumber,
        photoURL,
      } = _user;

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
        updatedTimestamp: Date.now(),
      };

      doc.set(userData, { merge: true });

      // Also store as subcollection for the heck of it (future queries?). Maybe unnecessary.
      doc.collection('authProviders')
        .doc(additionalUserInfo.providerId)
        .set(additionalUserInfo.profile, { merge: true });
    } catch (error) {
      // TODO: better error UX, and reporting solution
      // eslint-disable-next-line no-alert
      alert(`There was a problem signing in:\n\n${error.message}`);
      throw error;
    }
  };

  // Clear or set user, pulling user data from Firestore.
  useEffect(() => {
    (async () => {
      // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
      cleanupRef.current = await auth().onAuthStateChanged(async (authUser) => {
        if (authUser) {
          setIsOpen(false);

          try {
            const { uid } = authUser;
            const userDoc = await db.collection('users').doc(uid).get();

            if (userDoc.exists) {
              // preserve this ordering:
              setUser(new User(userDoc));
              setWasSignedIn(true);
            }
          } catch (error) {
            // TODO: better error UX, and reporting solution
            // eslint-disable-next-line no-alert
            alert(`There was a problem signing in:\n\n${error.message}`);
            throw error;
          }
        } else {
          setUser(null);
        }
      });
    })();

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  }, [auth, db]);

  const value = {
    showSignIn: () => setIsOpen(true),
    signOut: () => auth().signOut(),
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
