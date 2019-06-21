import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import PropTypes from 'prop-types';
import React from 'react';
import Rebase from 're-base';

import app from './app';
import FirebaseContext from './FirebaseContext';

export default function FirebaseProvider(props) {
  const { children } = props;
  const { auth } = firebase;
  const db = firebase.firestore(app);
  const base = Rebase.createClass(db);

  const value = {
    auth,
    db, // should generally use 'base' instead, unless direct (lower-level) access needed
    base,
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
