import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { clearFirestoreData } from '@firebase/testing';

import useCoachAssignments from '../../components/Firebase/useCoachAssignments';
import { createFirebaseUsers, firebaseProviderWrapper } from '../support/helpers';

describe('useCoachAssignments', () => {
  let users = [];

  beforeEach(async () => {
    users = await createFirebaseUsers();
  });

  afterEach(async () => {
    await clearFirestoreData({
      projectId: 'nj-career-network-test',
    });
  });

  it('builds and returns the user profiles and the question responses', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useCoachAssignments(users, 'users-test'),
      { wrapper: firebaseProviderWrapper() },
    );

    await waitForNextUpdate();

    // Assert profiles
    const donna = result.current[0].authProfile;
    const adam = result.current[1].authProfile;

    expect(donna.displayName).toEqual('Donna Noble');
    expect(adam.displayName).toEqual('Adam Mitchell');

    // Assert responses
    const binaryResponse = result.current[0].questionResponses[0].data();
    const textResponse = result.current[1].questionResponses[0].data();

    expect(binaryResponse.question.fields.Label).toEqual('Unemployment Insurance');
    expect(binaryResponse.question.fields['Response Type']).toEqual('Binary');
    expect(binaryResponse.value).toEqual(false);
    expect(textResponse.question.fields.Label).toEqual('Target jobs');
    expect(textResponse.question.fields['Response Type']).toEqual('Text');
    expect(textResponse.value).toEqual('School Operations Manager');
  });
});
