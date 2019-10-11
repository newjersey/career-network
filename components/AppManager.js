// This file should:
//  - show "signed in" on sign in
//  - show "signed out" on sign out
//  - redirect to '/' upon sign out (and not show a 403)
//  - redirect to '/assessment' or '/dashboard' upon sign in

import { useBeforeunload } from 'react-beforeunload';
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
      let url = '/assessment';
      if (user.isCoach) {
        url = '/coaching';
      } else if (user.isAssessmentComplete) {
        url = '/dashboard';
      }

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

  useEffect(() => {
    // start with a clean slate (prevent data leaks)
    if (!user) {
      window.Intercom('shutdown');
    }

    const config = {
      app_id: process.env.intercom.appId,

      ...(user && {
        name: user.displayName,
        email: user.email,
        user_id: user.uid,
        // created_at: '<%= current_user.created_at.to_i %>', // Signup date as a Unix timestamp
      }),
    };

    window.Intercom('boot', config);
  }, [user]);

  // end with a clean slate (prevent data leaks)
  useBeforeunload(event => {
    window.Intercom('shutdown');

    // The absence of a returnValue property on the event will guarantee the browser unload happens.
    // eslint-disable-next-line no-param-reassign
    delete event.returnValue;
  });

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
