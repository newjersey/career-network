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
  const [user, setUser] = useState(undefined); // tri-state (undefined, null, Object)
  const [wasSignedIn, setWasSignedIn] = useState(false);
  const cleanupRef = useRef();
  const { auth, db } = useFirebase();

  const handleCancel = () => setIsOpen(false);

  const userDocument = useCallback(
    uid => db.collection(process.env.firebase.userCollection).doc(uid),
    [db]
  );
  const userPreauthorizationDocument = useCallback(
    email => db.collection(process.env.firebase.userPreauthorizationCollection).doc(email),
    [db]
  );

  // Store user data in Firestore.
  const handleSignInSuccessWithAuthResult = authResult => {
    setIsOpen(false);

    try {
      const { additionalUserInfo, user: _user } = authResult;
      const { uid } = _user;

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
        updatedTimestamp: new Date(),
      };

      userDocument(uid).set(userData, { merge: true });
    } catch (error) {
      // TODO: better error UX, and reporting solution
      // eslint-disable-next-line no-alert
      alert(`There was a problem signing in:\n\n${error.message}`);
      throw error;
    }
  };

  const applyPreauthorizations = useCallback(
    (uid, userDoc, preauthorizationDoc) => {
      if (!userDoc || !preauthorizationDoc) {
        return;
      }
      const userData = userDoc.data();
      const preauthData = preauthorizationDoc.data();
      if (userData.isCoach === undefined) {
        userDocument(uid).set({ isCoach: preauthData.coach }, { merge: true });
      }
      if (userData.assignments === undefined && preauthData.assignments) {
        userDocument(uid).set({ assignments: preauthData.assignments }, { merge: true });
      }
    },
    [userDocument]
  );

  // Clear or set user, pulling user data from Firestore.
  useEffect(() => {
    // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
    cleanupRef.current = auth().onAuthStateChanged(async authUser => {
      if (authUser) {
        setIsOpen(false);

        try {
          const { email, uid } = authUser;
          const userDoc = await userDocument(uid).get();
          const preauthorizationDoc = await userPreauthorizationDocument(email).get();

          if (cleanupRef.current && userDoc.exists) {
            // preserve this ordering:
            applyPreauthorizations(uid, userDoc, preauthorizationDoc);
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

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }

      cleanupRef.current = null;
    };
  }, [applyPreauthorizations, auth, userDocument, userPreauthorizationDocument]);

  const value = {
    showSignIn: () => setIsOpen(true),
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
        onCancel={handleCancel}
        onSignInSuccessWithAuthResult={handleSignInSuccessWithAuthResult}
      />
    </React.Fragment>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
