import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Router from 'next/router';

import { useSnackbar } from '../Snackbar';
import SignInDialog from './SignInDialog';
import SignInDialogContext from './SignInDialogContext';

export default function SpackbarProvider(props) {
  const { children } = props;
  const showMessage = useSnackbar();
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => setIsOpen(false);
  const handleSignInSuccessWithAuthResult = (authResult) => {
    // the shape of profile varies by login provider.
    // we're too early in the login flow to use useUser
    const { profile } = authResult.additionalUserInfo;
    const firstName = profile.first_name
      || profile.given_name
      || profile.name.split(' ')[0];

    if (authResult.additionalUserInfo.isNewUser) {
      showMessage(`Welcome, ${firstName}!`);
      Router.push('/assessment');
    } else {
      showMessage(`Welcome back, ${firstName}!`);
      Router.push('/dashboard');
    }

    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <SignInDialogContext.Provider value={setIsOpen}>
        {children}
      </SignInDialogContext.Provider>
      <SignInDialog
        open={isOpen}
        onCancel={handleCancel}
        onSignInSuccessWithAuthResult={handleSignInSuccessWithAuthResult}
      />
    </React.Fragment>
  );
}

SpackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
