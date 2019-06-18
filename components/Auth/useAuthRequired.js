import { useEffect, useRef } from 'react';
import Router from 'next/router';

import { useSnackbar } from '../Snackbar';
import useAuth from './useAuth';

export default function useAuthRequired(failureMessage) {
  const { user, showSignIn } = useAuth();
  const showMessage = useSnackbar();
  const cleanupRef = useRef();

  useEffect(() => {
    if (!user) {
      (async () => {
        // TODO: don't redirect, and make sign in cancel redirect to home
        cleanupRef.current = await Router.push('/');
        showSignIn();
        showMessage(failureMessage || 'You must be signed in to view this page');
      })();
    }

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  }, [failureMessage, showMessage, showSignIn, user]);
}
