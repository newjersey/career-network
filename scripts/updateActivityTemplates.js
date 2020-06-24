/* eslint-disable no-console, import/no-unresolved */
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// const firebaseConfig = {
//  apiKey: 'AIzaSyBW2hLAzSgdv72lKicKcW_j1c86enCi8uU',
//  authDomain: 'njcareers.org',
//  databaseURL: 'https://nj-career-network.firebaseio.com',
//  projectId: 'nj-career-network',
//  storageBucket: 'nj-career-network.appspot.com',
//  messagingSenderId: '114141088298',
//  appId: '1:114141088298:web:ce96ec93a41e3d35',
//  credential: admin.credential.cert(
//    // Generate from Firebase console --> Settings --> Service accounts
//    // eslint-disable-next-line global-require
//    require('../.auth/nj-career-network-firebase-adminsdk-4v838-9f31760d84.json')
//  ),
// };

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

const projectId = 'nj-career-network-dev5';
const firebaseConfig = {
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  apiKey: 'AIzaSyCNdMzlu9heNVkRVD48DovbvnEMOkjLo7s',
  messagingSenderId: '555215588648',
  appId: '1:555215588648:web:c1f34ead2b56f9b6a6541d',
  credential: admin.credential.cert(
    // Generate from Firebase console --> Settings --> Service accounts
    // eslint-disable-next-line global-require
    require('../.auth/nj-career-network-dev5-ba2070698d23.json')
  ),
};

admin.initializeApp(firebaseConfig);
const app = admin.app();
const db = app.firestore();

const processTemplate = async (id, data) => {
  return db
    .collection('activityTemplates')
    .doc(id)
    .set(data, { merge: true })
    .then(() => console.log('successfully add data for: ', id))
    .catch(err => console.error('Could not add template: ', err));
};

const main = async () => {
  const templates = {};
  const directoryPath = path.resolve(__dirname, '../activity-templates/templates');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log(`Unable to scan directory: ${err}`);
    }
    files.forEach(module => {
      const templatePath = path.join(directoryPath, module);
      templates[module] = require(templatePath); // eslint-disable-line import/no-dynamic-require, global-require
      console.log('Processing :', module);
      processTemplate(module.replace('.json', ''), templates[module]);
    });
  });
};

main();
