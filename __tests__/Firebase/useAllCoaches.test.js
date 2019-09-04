import { renderHook } from '@testing-library/react-hooks';

import { createCoaches, firebaseProviderWrapper } from '../support/helpers';
import useAllCoaches from '../../components/Firebase/useAllCoaches';
import { env } from '../../next.config';

describe('useAllCoaches', () => {
  beforeEach(async () => {
    await createCoaches();
  });

  it('returns all the coaches', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useAllCoaches(env.firebase.userCollection),
      {
        wrapper: firebaseProviderWrapper(),
      }
    );

    await waitForNextUpdate();

    expect(result.current).toHaveLength(2);
    expect(result.current[0].authProfile.displayName).toEqual('Martha Jones');
    expect(result.current[1].authProfile.displayName).toEqual('Rose Tyler');
    expect(result.current.map(coach => coach.isCoach)).toEqual([true, true]);
    expect(result.current.map(coach => coach.isAdmin)).toEqual([false, false]);
  });
});
