import React from 'react';
import { render } from '@testing-library/react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from '../../src/theme';
import AuthContext from '../../components/Auth/AuthContext';
import firebaseTestApp from './firebase-test-app';
import * as factories from './factories';
import FirebaseProvider from '../../components/Firebase';

/**
 * Renders a component with all the necessary top-level providers
 */
export function renderWrapped(component) {
  const auth = factories.auth();
  const renderResult = render(
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={auth}>{component}</AuthContext.Provider>
    </ThemeProvider>
  );

  return {
    auth,
    ...renderResult,
  };
}
/**
 * Renders a wrapper containing the FirebaseProvider component, suitable for rendering hooks
 */
export function firebaseProviderWrapper() {
  return ({ children }) => (
    <FirebaseProvider customFirebase={firebaseTestApp}>{children}</FirebaseProvider>
  );
}

/**
 * Adds a couple of users in Firebase and attaches a questionResponse to each of them
 */
export async function createFirebaseUsers() {
  const db = firebaseTestApp.firestore();
  const users = [
    await db.collection('users-test').add(factories.authData()),
    await db.collection('users-test').add(
      factories.authData({
        authProfile: {
          ...factories.authProfile(),
          displayName: 'Adam Mitchell',
          email: 'adam@example.org',
        },
      })
    ),
  ];

  await users[0].collection('questionResponses').add(factories.binaryResponse());
  await users[1].collection('questionResponses').add(factories.textResponse());

  return users.map(doc => doc.id);
}
