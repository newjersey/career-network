import * as factories from '../support/factories';
import UserPreAuthorizations from '../../src/UserPreAuthorizations';

describe('UserPreAuthorizations', () => {
  const userRef = {
    data: () => factories.authData(),
    exists: true,
    ref: {
      set: jest.fn(),
    },
  };

  const preAuthRef = {
    data: () => factories.preAuthData(),
    exists: true,
    ref: {
      set: jest.fn(),
    },
  };

  describe('apply', () => {
    it('merges the pre-authorizations with the user', () => {
      new UserPreAuthorizations(userRef, preAuthRef).apply();

      expect(userRef.ref.set).toHaveBeenCalledWith(preAuthRef.data(), { merge: true });
    });

    it('performs no action when references are not present', () => {
      new UserPreAuthorizations(null, { ...preAuthRef, exists: false }).apply();

      expect(userRef.ref.set).not.toHaveBeenCalled();
      expect(preAuthRef.ref.set).not.toHaveBeenCalled();
    });

    it('performs no action when already merged', () => {
      new UserPreAuthorizations(userRef, {
        ...preAuthRef,
        data: () => factories.preAuthData({ mergeTimestamp: new Date() }),
      }).apply();

      expect(userRef.ref.set).not.toHaveBeenCalled();
      expect(preAuthRef.ref.set).not.toHaveBeenCalled();
    });
  });
});
