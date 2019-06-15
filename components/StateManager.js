import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { useAuth } from './Auth';
import { useSnackbar } from './Snackbar';

export default function StateManager(props) {
  const { children } = props;
  const { user, wasSignedIn } = useAuth();
  const showMessage = useSnackbar();

  useEffect(() => {
    // TODO: make this real.
    // eslint-disable-next-line no-unused-vars
    const isAssessmentComplete = _user => false;

    if (user) {
      showMessage('Signed in');
      Router.push(isAssessmentComplete(user) ? '/dashboard' : '/assessment');
    } else if (wasSignedIn) { // Check wasSignedIn, else block will fire upon initial page load.
      Router.push('/');
      showMessage('Signed out');
    }
  }, [showMessage, user, wasSignedIn]);

  return children;
}

StateManager.props = {
  children: PropTypes.node.isRequired,
};
