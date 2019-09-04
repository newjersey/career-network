// This file should:
//  - show "signed in" on sign in
//  - show "signed out" on sign out
//  - redirect to '/' upon sign out (and not show a 403)
//  - redirect to '/assessment' or '/dashboard' upon sign in

import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import Router from 'next/router';

import { useAuth } from './Auth';
import { useSnackbar } from './Snackbar';
import EnvName from './EnvName';
import Footer from './Footer';
import Header from './Header';

export default function AppManager(props) {
  const { children } = props;
  const { user, signOut, wasSignedIn } = useAuth();
  const cleanupRef = useRef();
  const showMessage = useSnackbar();

  const handleSignOut = useCallback(async () => {
    await Router.push('/');
    signOut();
  }, [signOut]);

  useEffect(() => {
    if (user) {
      showMessage('Signed in');
    } else if (wasSignedIn) {
      // Check wasSignedIn, else block will fire upon initial page load.
      showMessage('Signed out');
    }
  }, [showMessage, user, wasSignedIn]);

  useEffect(() => {
    if (user) {
      const url = user.isAssessmentComplete ? '/dashboard' : '/assessment';

      (async () => {
        cleanupRef.current = Router.push(url);
      })();
    }

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  }, [user]);

  return (
    <React.Fragment>
      {process.env.showName && <EnvName />}
      <Header onSignOut={handleSignOut} user={user} />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
}

AppManager.propTypes = {
  children: PropTypes.node.isRequired,
};
