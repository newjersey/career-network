// This file should:
//  - show "signed in" on sign in
//  - show "signed out" on sign out
//  - redirect to '/' upon sign out (and not show a 403)
//  - redirect to '/assessment' or '/dashboard' upon sign in

import { useBeforeunload } from 'react-beforeunload';
import * as Sentry from '@sentry/browser';
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
  const userExists = !!user;
  const userId = user && user.uid;

  const handleSignOut = useCallback(async () => {
    await Router.push('/');
    signOut();
  }, [signOut]);

  useEffect(() => {
    if (userExists) {
      showMessage('Signed in');
    } else if (wasSignedIn) {
      // Check wasSignedIn, else block will fire upon initial page load.
      showMessage('Signed out');
    }
  }, [showMessage, userExists, wasSignedIn]);

  useEffect(() => {
    Sentry.configureScope(scope => {
      scope.setUser(userId ? { id: userId } : null);
    });
  }, [userId]);

  const userIsCoach = user && user.isCoach;
  const userIsAssessmentComplete = user && user.isAssessmentComplete;
  useEffect(() => {
    if (userId) {
      let url = '/assessment';
      if (userIsCoach) {
        url = '/coaching';
      } else if (userIsAssessmentComplete) {
        url = Router.router && Router.route === '/progress' ? '/progress' : '/dashboard';
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
  }, [userId, userIsAssessmentComplete, userIsCoach]);

  const userCreationTimestampSeconds = user && user.creationTimestamp.seconds;
  const intercomUserHash = user && user.intercomUserHash;
  const userDisplayName = user && user.displayName;
  const userEmail = user && user.email;
  const userPhotoURL = user && user.photoURL;
  useEffect(() => {
    // start with a clean slate (prevent data leaks)
    if (!intercomUserHash) {
      window.Intercom('shutdown');
    }

    const config = {
      app_id: process.env.intercom.appId,
      environment: process.env.name, // custom data attribute

      // wait for intercomUserHash to be generated by async backend function:
      ...(intercomUserHash && {
        name: userDisplayName,
        email: userEmail,
        user_id: userId,
        user_hash: intercomUserHash,
        created_at: userCreationTimestampSeconds,
        avatar: {
          type: 'avatar',
          image_url: userPhotoURL,
        },
      }),
    };

    // the timeout prevents some kind of race condition that throws a benign console
    // error when booting immediately after the above "clean slate" shutdown
    window.setTimeout(() => window.Intercom('boot', config), 1);

    return () => window.Intercom('shutdown');
  }, [
    intercomUserHash,
    userCreationTimestampSeconds,
    userDisplayName,
    userEmail,
    userId,
    userPhotoURL,
  ]);

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
