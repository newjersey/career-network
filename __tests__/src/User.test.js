import * as factories from '../support/factories';

describe('User', () => {
  describe('firstName', () => {
    it('builds the first name containing spaces', () => {
      const user = factories.user({ authProfile: { displayName: 'John Doe' } });

      expect(user.firstName).toEqual('John');
    });

    it('builds the first name when it contains a comma', () => {
      const user = factories.user({ authProfile: { displayName: 'Doe, John B.' } });

      expect(user.firstName).toEqual('John B.');
    });
  });

  describe('displayName', () => {
    it('builds the full name', () => {
      const user = factories.user({ authProfile: { displayName: 'John Doe' } });

      expect(user.displayName).toEqual('John Doe');
    });

    it('builds the full name when it contains a comma', () => {
      const user = factories.user({ authProfile: { displayName: 'Doe, John B.' } });

      expect(user.displayName).toEqual('John B. Doe');
    });
  });

  describe('isCoach', () => {
    it('returns the coach flag', () => {
      const user = factories.user({ isCoach: true });

      expect(user.isCoach).toEqual(true);
    });
  });

  describe('coachAssignments', () => {
    it('returns the assigned assignments for the coach', () => {
      expect(factories.user().coachAssignments).toEqual([
        'GoJwVoinaZkIeUYyhd2M',
        'Tu3HUHFxmHrFTRtlGlny',
      ]);
    });
  });
});
