import fs from 'fs';
import path from 'path';
import { initializeTestApp, loadFirestoreRules } from '@firebase/testing';

const firebaseTestApp = initializeTestApp({
  projectId: 'nj-career-network-test',
  auth: { uid: 'test-user', email: 'test-user@example.com' },
});

loadFirestoreRules({
  projectId: 'nj-career-network-test',
  rules: fs.readFileSync(path.resolve(__dirname, './firestore.test.rules'), 'utf8'),
});

export default firebaseTestApp;
