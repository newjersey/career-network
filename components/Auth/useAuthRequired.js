import { useEffect, useRef } from 'react';
import Router from 'next/router';

import { useSnackbar } from '../Snackbar';
import useAuth from './useAuth';

export default function useAuthRequired(failureMessage) {
  const { user, showSignIn, wasSignedIn } = useAuth();
  const showMessage = useSnackbar();
  const cleanupRef = useRef();

  useEffect(() => {
    if (!user) {
      if (!wasSignedIn) {
        showSignIn();
        showMessage(failureMessage || 'You must be signed in to view this page');
      }

      // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
      (async () => { cleanupRef.current = await Router.push('/'); })();
    }

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  }, [failureMessage, showMessage, user, showSignIn, wasSignedIn]);
}
