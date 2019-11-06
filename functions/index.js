const admin = require('firebase-admin');
const { linkedinRedirect, linkedinAuthorize } = require('./linkedinAuth');
const { firestoreBackup } = require('./fireStore');
const { intercomUserHash } = require('./intercom');

// Firebase Setup
const serviceAccount = require('./service-account.json');

const appId = process.env.GCLOUD_PROJECT;
// TODO: remove hardcoded env settings

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${appId}.firebaseio.com`,
});

exports.intercomUserHash = intercomUserHash;
exports.firestoreBackup = firestoreBackup;
exports.linkedinRedirect = linkedinRedirect;
exports.linkedinAuthorize = linkedinAuthorize;
