import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import PropTypes from 'prop-types';
import React from 'react';

import app from './app';
import FirebaseContext from './FirebaseContext';

export default function FirebaseProvider(props) {
  const { children } = props;

  const value = {
    auth: firebase.auth,
    db: firebase.firestore(app),
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
