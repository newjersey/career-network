const admin = require('firebase-admin');
const { redirect, token } = require('./linkedinAuth');
const { firestoreBackup } = require('./fireStore');
const { intercomUserHash } = require('./intercom');

// Firebase Setup
const serviceAccount = require('./service-account.json');

const appId = 'nj-career-network-dev3';
// TODO: remove hardcoded env settings

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${appId}.firebaseio.com`,
});

exports.intercomUserHash = intercomUserHash;
exports.firestoreBackup = firestoreBackup;
exports.redirect = redirect;
exports.token = token;
