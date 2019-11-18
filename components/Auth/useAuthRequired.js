import { useEffect, useRef } from 'react';
import Router from 'next/router';

import { useSnackbar } from '../Snackbar';
import useAuth from './useAuth';

export default function useAuthRequired(
  failureMessage = 'You must be signed in to view this page'
) {
  const { isAuthKnown, showSignIn, user } = useAuth();
  const showMessage = useSnackbar();
  const cleanupRef = useRef();

  useEffect(() => {
    // check isAuthKnown to ensure we don't falsely assume a user is not logged in
    // before the user object has a chance to populate
    if (isAuthKnown && !user) {
      cleanupRef.current = Router.push('/');

      if (cleanupRef.current) {
        showSignIn();
        showMessage(failureMessage);
      }
    }

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }

      cleanupRef.current = null;
    };
  }, [failureMessage, isAuthKnown, showMessage, showSignIn, user]);
}
