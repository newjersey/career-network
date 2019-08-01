import fs from 'fs';
import path from 'path';
import firebase from 'firebase/app';
import { initializeTestApp, loadFirestoreRules } from '@firebase/testing';
import { env } from '../../next.config';

const firebaseTestApp = initializeTestApp({
  projectId: env.firebase.projectId,
  auth: {
    uid: 'test-user',
    email: 'test-user@example.com',
  },
});

loadFirestoreRules({
  projectId: env.firebase.projectId,
  rules: fs.readFileSync(path.resolve(__dirname, './firestore.test.rules'), 'utf8'),
});

firebase.initializeApp(env.firebase);

export default firebaseTestApp;
