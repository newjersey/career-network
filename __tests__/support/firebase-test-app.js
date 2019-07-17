import { initializeTestApp } from '@firebase/testing';

const firebaseTestApp = initializeTestApp({
  projectId: 'nj-career-network-test',
  auth: { uid: 'test-user', email: 'test-user@example.com' },
});

export default firebaseTestApp;
