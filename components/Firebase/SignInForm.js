import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import Router from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
  },
  progress: {
    margin: '0 auto',
    display: 'block',
  },
}));

export default function SignInForm() {
  const classes = useStyles();
  const [uiShown, setUiShown] = useState(false);

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.

        // TODO: remove
        // eslint-disable-next-line no-console
        console.log('Signed in', 'authResult:', authResult, 'redirectUrl:', redirectUrl);

        Router.push('/dashboard');

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
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '/terms-of-service',
    // Privacy policy url.
    privacyPolicyUrl: '/privacy-policy',
  };

  return (
    <div className={classes.root}>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      {!uiShown && <CircularProgress className={classes.progress} color="primary" />}
    </div>
  );
}
