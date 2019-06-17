import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { useAuth } from './Auth';
import { useSnackbar } from './Snackbar';

export default function StateManager(props) {
  const { children } = props;
  const { user, wasSignedIn } = useAuth();
  const cleanupRef = useRef();
  const showMessage = useSnackbar();


  useEffect(() => {
    // TODO: make this real.
    // eslint-disable-next-line no-unused-vars
    const isAssessmentComplete = _user => false;

    if (user) {
      const url = isAssessmentComplete(user) ? '/dashboard' : '/assessment';
      (async () => { cleanupRef.current = await Router.push(url); })();
      showMessage('Signed in');
    } else if (wasSignedIn) { // Check wasSignedIn, else block will fire upon initial page load.
      (async () => { cleanupRef.current = await Router.push('/'); })();
      showMessage('Signed out');
    }

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  }, [showMessage, user, wasSignedIn]);

  return children;
}

StateManager.props = {
  children: PropTypes.node.isRequired,
};
