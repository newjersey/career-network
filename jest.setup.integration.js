import './jest.setup';
import { clearFirestoreData } from '@firebase/testing';
import { env } from './next.config';

import firebaseTestApp from './__tests__/support/firebase-test-app';

afterEach(async () => {
  await clearFirestoreData({
    projectId: env.firebase.projectId,
  });
});

afterAll(() => firebaseTestApp.delete());
