import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { useFirebase } from '../Firebase';
import FullPageProgress from '../FullPageProgress';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
  },
  progressContainer: {
    height: theme.spacing(12),
  },
}));

export default function AuthForm(props) {
  const { onSignInSuccessWithAuthResult } = props;
  const { auth } = useFirebase();
  const classes = useStyles();
  const [uiShown, setUiShown] = useState(false);

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult(authResult, redirectUrl) {
        if (onSignInSuccessWithAuthResult) {
          onSignInSuccessWithAuthResult(authResult, redirectUrl);
        }

        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false;
      },
      uiShown() {
        setUiShown(true);
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    // signInSuccessUrl: '/dashboard',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      auth.GoogleAuthProvider.PROVIDER_ID,
      // auth.FacebookAuthProvider.PROVIDER_ID,
      {
        provider: 'microsoft.com',
        providerName: 'Microsoft',
        buttonColor: '#575352',
        iconUrl: '/static/img/microsoft.svg',
      },
      {
        provider: 'yahoo.com',
        providerName: 'Yahoo',
        buttonColor: '#400090',
        iconUrl: '/static/img/yahoo.svg',
        scopes: ['sdpp-w'],
      },
      // auth.GithubAuthProvider.PROVIDER_ID,
      // auth.TwitterAuthProvider.PROVIDER_ID,
      // auth.EmailAuthProvider.PROVIDER_ID,
      // auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '/terms-of-service',
    // Privacy policy url.
    privacyPolicyUrl: '/privacy-policy',
  };
  const linkedinUrl = `https://us-central1-${process.env.firebase.projectId}.cloudfunctions.net/redirect`;

  return (
    <div className={classes.root}>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
      <a href={linkedinUrl}>Linkedin</a>
      {!uiShown && (
        <div className={classes.progressContainer}>
          <FullPageProgress />
        </div>
      )}
    </div>
  );
}

AuthForm.propTypes = {
  onSignInSuccessWithAuthResult: PropTypes.func,
};

AuthForm.defaultProps = {
  onSignInSuccessWithAuthResult: null,
};
