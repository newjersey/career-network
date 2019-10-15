// Conceptual capabilities of this component should be limited to:
//  - provide sign in screen
//  - provide sign out action
//  - provide user (is signed in/out)

import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import isEmpty from 'lodash/fp/isEmpty';
import isNil from 'lodash/fp/isNil';

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
        isAdmin: false,
      };

      userDocument(uid).set(userData, { merge: true });
    } catch (error) {
      // TODO: better error UX, and reporting solution
      // eslint-disable-next-line no-alert
      alert(`There was a problem signing in:\n\n${error.message}`);
      throw error;
    }
  };

  const documentExists = doc => doc && doc.exists;

  const buildPreauthFields = useCallback((userRef, preauthRef) => {
    const userData = userRef.data();
    if (!documentExists(preauthRef)) {
      return isNil(userData.isCoach) ? { isCoach: false } : {};
    }

    const fields = {};
    const preauthData = preauthRef.data();
    if (isNil(userData.isCoach)) {
      fields.isCoach = !!preauthData.coach;
    }
    if (isNil(userData.assignments) && preauthData.assignments) {
      fields.assignments = preauthData.assignments;
    }

    return fields;
  }, []);

  const applyPreauthorizations = useCallback(
    (uid, userRef, preauthRef) => {
      if (!documentExists(userRef)) {
        return;
      }

      const preauthFields = buildPreauthFields(userRef, preauthRef);
      if (!isEmpty(preauthFields)) {
        userDocument(uid).set(preauthFields, { merge: true });
      }
    },
    [userDocument, buildPreauthFields]
  );

  // Clear or set user, pulling user data from Firestore.
  useEffect(() => {
    // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
    cleanupRef.current = auth().onAuthStateChanged(async authUser => {
      if (authUser) {
        setIsOpen(false);

        try {
          const { email, uid } = authUser;
          const userRef = await userDocument(uid).get();
          const preauthRef = await userPreauthorizationDocument(email).get();

          if (cleanupRef.current && userRef.exists) {
            // preserve this ordering:
            applyPreauthorizations(uid, userRef, preauthRef);
            setUser(new User(userRef));
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
