import User from '../../src/User';

export function authProfile(attributes = {}) {
  return {
    displayName: 'Donna Noble',
    email: 'donna@example.org',
    emailVerified: true,
    isAnonymous: false,
    phoneNumber: '+1555555555',
    photoURL: 'http://example.org/photo',
    ...attributes,
  };
}
export function authData(attributes = {}) {
  return {
    authProfile: authProfile(),
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

export function binaryResponse(attributes = {}) {
  return {
    question: {
      createdTime: '2019-06-13T03:32:26.000Z',
      fields: {
        Group: ['recu5ai89STpot7mK'],
        'Group Assessment Entry': ['recz8hJly19bPP4TM'],
        Label: 'Unemployment Insurance',
        Name: 'Wants help with Unemployment Insurance',
        'Order Within Group': 1,
        'Predicate Count': 1,
        Predicates: ['reclOZjX78hk06thv'],
        'Response Type': 'Binary',
      },
      id: 'reclhg2zVOBNJg1EH',
    },
    value: false,
    ...attributes,
  };
}

export function textResponse(attributes = {}) {
  return {
    question: {
      createdTime: '2019-06-13T02:12:47.000Z',
      fields: {
        Label: 'Target jobs',
        Name: 'Target jobs',
        'Predicate Count': 3,
        Predicates: ['rece056KmICUMNEyM', 'reccOuc2o2gNoI4J4', 'rec6nUE0yQRMpzTQo'],
        'Question Assessment Entry': ['reccmKFdVBHhuLXUr'],
        'Question Assessment Entry:Order': ['3.1'],
        'Response Type': 'Text',
      },
      id: 'recwi4RSEfT86m1rQ',
    },
    value: 'School Operations Manager',
    ...attributes,
  };
}

export function assessmentSection(attributes = {}) {
  return {
    id: 'recnn7wRBWqrk6Bst',
    fields: {
      Name: 'About you',
      Order: 1,
      'Assessment Entries': ['recz8hJly19bPP4TM'],
      'Short Name': 'About you',
      'Entry Count': 2,
      'Question Count': 2,
    },
    createdTime: '2019-06-13T01:51:01.000Z',
    ...attributes,
  };
}

export function assessmentSections() {
  return [
    assessmentSection(),
    assessmentSection({
      id: 'recJoTF9xn1p93sNN',
      fields: {
        Name: 'Your past',
        Order: 2,
        Description: 'Tell us about your most recent employment:',
        'Assessment Entries': ['reccmKFdVBHhuLXUr'],
        'Short Name': 'Your past',
        'Entry Count': 2,
        'Question Count': 2,
      },
    }),
  ];
}

export function coachAssignment(attributes) {
  return {
    authProfile: authProfile(),
    questionResponses: [binaryResponse(), textResponse()],
    ...attributes,
  };
}

export function coachAssignments() {
  return [
    coachAssignment({ questionResponses: [{ data: () => binaryResponse() }] }),
    coachAssignment({
      authProfile: authProfile({ displayName: 'Adam Mitchell', email: 'adam@example.org' }),
      questionResponses: [{ data: () => textResponse() }],
    }),
  ];
}
