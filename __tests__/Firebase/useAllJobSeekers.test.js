import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { clearFirestoreData } from '@firebase/testing';

import { createUsers, firebaseProviderWrapper } from '../support/helpers';
import useAllJobSeekers from '../../components/Firebase/useAllJobSeekers';
import { env } from '../../next.config';

describe('useAllJobSeekers', () => {
  beforeEach(async () => {
    await createUsers();
  });

  afterEach(async () => {
    await clearFirestoreData({
      projectId: env.firebase.projectId,
    });
  });

  it('returns all the job seekers', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useAllJobSeekers(env.firebase.userCollection),
      {
        wrapper: firebaseProviderWrapper(),
      },
    );

    await waitForNextUpdate();

    expect(result.current).toHaveLength(2);
    expect(result.current[0].authProfile.displayName).toEqual('Adam Mitchell');
    expect(result.current[1].authProfile.displayName).toEqual('Donna Noble');
    expect(result.current.map(coach => coach.isCoach)).toEqual([false, false]);
    expect(result.current.map(coach => coach.isAdmin)).toEqual([false, false]);
  });
});
