import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import PropTypes from 'prop-types';
import React from 'react';

import app from './app';
import FirebaseContext from './FirebaseContext';

export default function FirebaseProvider(props) {
  const { children, firebaseApp } = props;
  const { auth } = firebaseApp;
  const db = firebaseApp.firestore(app);

  const value = {
    auth,
    db,
  };

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
}

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
  firebaseApp: PropTypes.shape(firebase.app.App),
};

FirebaseProvider.defaultProps = {
  firebaseApp: firebase,
};
