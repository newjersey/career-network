import { useEffect, useRef } from 'react';
import Router from 'next/router';

import { useSnackbar } from '../Snackbar';
import useAuth from './useAuth';

export default function useAuthRequired(failureMessage) {
  const { user, showSignIn } = useAuth();
  const showMessage = useSnackbar();
  const cleanupRef = useRef();

  useEffect(() => {
    // user will be null when definitively signed out, and
    // user will be undefined until auth status can be determined
    if (user === null) {
      cleanupRef.current = Router.push('/');

      if (cleanupRef.current) {
        showSignIn();
        showMessage(failureMessage || 'You must be signed in to view this page');
      }
    }

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }

      cleanupRef.current = null;
    };
  }, [failureMessage, showMessage, showSignIn, user]);
}
