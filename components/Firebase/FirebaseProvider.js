import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import PropTypes from 'prop-types';
import React from 'react';

import app from './app';
import FirebaseContext from './FirebaseContext';

export default function FirebaseProvider(props) {
  const { children, customFirebase } = props;
  const firebaseApp = customFirebase || firebase;
  const { auth } = firebaseApp;
  const db = firebaseApp.firestore(app);
  const storage = firebaseApp.storage(app);

  const value = {
    auth,
    db,
    storage,
  };

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
}

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
  customFirebase: PropTypes.shape(firebase.app.App),
};

FirebaseProvider.defaultProps = {
  customFirebase: undefined,
};
