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

export function preauthorizationData(attributes = {}) {
  return {
    assignments: ['GoJwVoinaZkIeUYyhd2M', 'Tu3HUHFxmHrFTRtlGlny'],
    coach: true,
    pilot: true,
    ...attributes,
  };
}

export function user(userAttributes = {}, preauthorizationAttributes = {}) {
  const userDoc = {
    id: 'TEST-USER',
    data: () => authData(),
    ...userAttributes,
  };

  const preauthorizationDoc = {
    id: 'TEST-PREAUTHORIZATION',
    data: () => preauthorizationData(),
    ...preauthorizationAttributes,
  };

  return new User(userDoc, preauthorizationDoc);
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
