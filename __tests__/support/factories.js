import User from '../../src/User';

export function authData(attributes = {}) {
  return {
    authProfile: {
      displayName: 'Test User',
      email: 'test-user@example.org',
      emailVerified: true,
      isAnonymous: false,
      phoneNumber: '+1555555555',
      photoURL: 'http://example.org/photo',
    },
    authProviders: {},
    isAssessmentComplete: true,
    ...attributes,
  };
}

export function user(attributes = {}) {
  const userDoc = {
    id: 'TEST-USER',
    data: () => authData(),
    ...attributes,
  };

  return new User(userDoc);
}

export function auth() {
  return {
    showSignIn: jest.fn(),
    signOut: jest.fn(),
    user: user(),
    userDocRef: true,
    wasSignedIn: false,
  };
}
