import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { clearFirestoreData } from '@firebase/testing';

import { createCoaches, firebaseProviderWrapper } from '../support/helpers';
import useUser from '../../components/Firebase/useUser';
import User from '../../src/User';
import firebaseTestApp from '../support/firebase-test-app';
import { env } from '../../next.config';

describe('useUser', () => {
  let users = [];

  beforeEach(async () => {
    users = await createCoaches();
  });

  afterEach(async () => {
    await clearFirestoreData({
      projectId: env.firebase.projectId,
    });
  });

  describe('buildUser', () => {
    it('builds and returns a new user object', async () => {
      const { result } = renderHook(() => (
        useUser(env.firebase.userCollection, env.firebase.userPreauthorizationCollection)
      ), { wrapper: firebaseProviderWrapper() });

      const userObject = await result.current.buildUser(users[0]);

      expect(userObject).toBeInstanceOf(User);
      expect(userObject.displayName).toEqual('Martha Jones');
      expect(userObject.isCoach).toEqual(true);
      expect(userObject.coachAssignments).toEqual([]);
    });
  });

  describe('updateUser', () => {
    it('updates the user assignments', async () => {
      const { result } = renderHook(() => (
        useUser(env.firebase.userCollection, env.firebase.userPreauthorizationCollection)
      ), { wrapper: firebaseProviderWrapper() });

      await result.current.updateUser('rose@example.org', {
        assignments: [users[0].id],
      });

      const preauths = await firebaseTestApp
        .firestore()
        .collection(env.firebase.userPreauthorizationCollection)
        .doc('rose@example.org')
        .get();
      expect(preauths.data().assignments).toEqual([users[0].id]);
    });
  });
});
