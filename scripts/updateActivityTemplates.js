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

// const projectId = 'nj-career-network-dev2';
// const firebaseConfig = {
//   authDomain: `${projectId}.firebaseapp.com`,
//   databaseURL: `https://${projectId}.firebaseio.com`,
//   projectId,
//   storageBucket: `${projectId}.appspot.com`,
//   apiKey: 'AIzaSyCNdMzlu9heNVkRVD48DovbvnEMOkjLo7s',
//   messagingSenderId: '555215588648',
//   appId: '1:555215588648:web:c1f34ead2b56f9b6a6541d',
//   credential: admin.credential.cert(
//     // Generate from Firebase console --> Settings --> Service accounts
//     // eslint-disable-next-line global-require
//     require('../.auth/nj-career-network-dev2-firebase-adminsdk-45t59-068e3d66f9.json')
//   ),
// };

// prod
const firebaseConfig = {
  apiKey: 'AIzaSyBW2hLAzSgdv72lKicKcW_j1c86enCi8uU',
  authDomain: 'nj-career-network.firebaseapp.com',
  databaseURL: 'https://nj-career-network.firebaseio.com',
  projectId: 'nj-career-network',
  storageBucket: 'nj-career-network.appspot.com',
  messagingSenderId: '114141088298',
  appId: '1:114141088298:web:ce96ec93a41e3d35',
  measurementId: 'G-48C1WWQMMD',
  credential: admin.credential.cert(
    // Generate from Firebase console --> Settings --> Service accounts
    // eslint-disable-next-line global-require
    require('../.auth/nj-career-network-firebase-adminsdk-4v838-265d45154c.json')
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
  // retrieve templates that are already in firebase
  const templatesInDb = (await db.collection('activityTemplates').listDocuments()).map(
    doc => doc.id
  );

  // read all the templates that are in the activity-templates/templates directory
  // the activity-templates/templates directory is treated as source of truth
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log(`Unable to scan directory: ${err}`);
    }
    // Iterate through templates directory
    // If the template exists in firebase but is not in the templates dir, delete it from firebase
    // If the template exists in templates/ but not in firebase, add it to firebase
    // If the template exists in both firebase and templates/, update it (temporarily)
    files.forEach(module => {
      const templateId = module.replace('.json', '');
      const foundIndex = templatesInDb.indexOf(templateId);
      const templatePath = path.join(directoryPath, module);
      if (foundIndex > -1) {
        console.log('Template exists!');
        templatesInDb.splice(foundIndex, 1);
      }
      templates[module] = require(templatePath); // eslint-disable-line import/no-dynamic-require, global-require
      console.log('Processing :', module);
      processTemplate(templateId, templates[module]);
    });
    if (templatesInDb.length > 0) {
      // remove these files
      templatesInDb.forEach(tempId =>
        db
          .collection('activityTemplates')
          .doc(tempId)
          .delete()
          .then(() => console.log('Deleted template: ', tempId))
          .catch(() => console.error('Could not delete: ', tempId))
      );
    }
  });
};

main();
