/* eslint-disable no-console */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');

exports.intercomUserHash = functions.auth.user().onCreate(user => {
  const { identity_verification_secret: secret } = functions.config().intercom;
  const { uid } = user;
  const hash = crypto
    .createHmac('sha256', secret)
    .update(uid)
    .digest('hex');

  console.log(`Storing Intercom identity verification hash for user ID: ${uid}`);

  return admin
    .firestore()
    .collection('users')
    .doc(uid)
    .set({ intercomUserHash: hash }, { merge: true });
});
