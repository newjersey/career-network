/* eslint-disable no-console */
/* Just a rough utility script for doing some manual data migrations in production.
 * Invoked as a plain node.js file (node scripts/foo.js) with hard coded config.
 * NTOE: permissions to data will need to be temporarily granted in Firestore.
 */

const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');

const SOURCE_USER_ID = 'xxx'; // TODO: set me
const TARGET_USER_ID = 'yyy'; // TODO: set me
const USER_SUBCOLLECTION = 'assessmentConfigurationsLog';
const DOCUMENT_ID = 'initialAssessment';

const firebaseConfig = {
  apiKey: 'AIzaSyBW2hLAzSgdv72lKicKcW_j1c86enCi8uU',
  authDomain: 'njcareers.org',
  databaseURL: 'https://nj-career-network.firebaseio.com',
  projectId: 'nj-career-network',
  storageBucket: 'nj-career-network.appspot.com',
  messagingSenderId: '114141088298',
  appId: '1:114141088298:web:ce96ec93a41e3d35',
  userCollection: 'users',
  sentimentEventsCollection: 'sentimentEvents',
  userPreauthorizationCollection: 'userPreauthorizations',
};

firebase.initializeApp(firebaseConfig);
const app = firebase.app();
const fs = app.firestore();
const getDocRef = userId => {
  return fs
    .collection('users')
    .doc(userId)
    .collection(USER_SUBCOLLECTION)
    .doc(DOCUMENT_ID);
};

const main = async () => {
  const sourceConfigRef = getDocRef(SOURCE_USER_ID);
  const sourceDoc = await sourceConfigRef.get();
  const sourceData = sourceDoc.data();
  console.log(sourceData);

  const targetConfigRef = getDocRef(TARGET_USER_ID);
  targetConfigRef.set(sourceData);
};

main();
