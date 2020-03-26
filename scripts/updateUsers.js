/* eslint-disable no-console */
const admin = require('firebase-admin');

const firebaseConfig = {
  apiKey: 'AIzaSyBW2hLAzSgdv72lKicKcW_j1c86enCi8uU',
  authDomain: 'njcareers.org',
  databaseURL: 'https://nj-career-network.firebaseio.com',
  projectId: 'nj-career-network',
  storageBucket: 'nj-career-network.appspot.com',
  messagingSenderId: '114141088298',
  appId: '1:114141088298:web:ce96ec93a41e3d35',
  credential: admin.credential.cert(
    // Generate from Firebase console --> Settings --> Service accounts
    // eslint-disable-next-line global-require
    require('../.auth/nj-career-network-firebase-adminsdk-4v838-9f31760d84.json')
  ),
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyDx21FkVqjXshORafAbzPvv2kACmXhATok',
//   authDomain: 'preview.njcareers.org',
//   databaseURL: 'https://nj-career-network-ppe.firebaseio.com',
//   projectId: 'nj-career-network-ppe',
//   storageBucket: '',
//   messagingSenderId: '641946008142',
//   appId: '1:641946008142:web:c6d623bc79bc899e',
//   credential: admin.credential.cert(
//     // Generate from Firebase console --> Settings --> Service accounts
//     // eslint-disable-next-line global-require
//     require('../.auth/nj-career-network-ppe-firebase-adminsdk-7erlw-3d51015d3e.json')
//   ),
// };

// const projectId = 'nj-career-network-dev1';
// const firebaseConfig = {
//   authDomain: `${projectId}.firebaseapp.com`,
//   databaseURL: `https://${projectId}.firebaseio.com`,
//   projectId,
//   storageBucket: `${projectId}.appspot.com`,
//   apiKey: 'AIzaSyDybN2rwlC_Hwld0SJncFH8preMI4MXKic',
//   messagingSenderId: '81682397202',
//   appId: '1:81682397202:web:5caa69d4e9c28d1e',
//   credential: admin.credential.cert(
//     // Generate from Firebase console --> Settings --> Service accounts
//     // eslint-disable-next-line global-require
//     require('../.auth/nj-career-network-dev1-firebase-adminsdk-ymost-768dc486af.json')
//   ),
// };

admin.initializeApp(firebaseConfig);
const { FieldValue } = admin.firestore;
const app = admin.app();
const fs = app.firestore();
let n = 0;

const processUser = doc => {
  const userData = doc.data();
  const { lastSentimentTimestamp } = userData;

  if (lastSentimentTimestamp) {
    n += 1;
    const userRef = fs.collection('users').doc(doc.id);
    userRef.update(
      {
        lastSentimentTimestamp: FieldValue.delete(),
        lastSentiment: {
          timestamp: lastSentimentTimestamp,
        },
      },
      { merge: true }
    );
  }
};

const main = async () => {
  const snapshot = await fs.collection('users').get();
  snapshot.forEach(doc => processUser(doc));
  console.log(`Updated ${n} records.`);
};

main();
