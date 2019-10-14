/* eslint-disable no-console */
const { Storage } = require('@google-cloud/storage');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

admin.initializeApp();

exports.firestoreBackup = functions.pubsub
  .schedule('every day 04:00')
  .timeZone('America/New_York')
  .onRun(async () => {
    const storage = new Storage();
    const bucketName = `${process.env.GCLOUD_PROJECT}-backups`;

    try {
      const bucket = storage.bucket(bucketName);
      const bucketExists = (await bucket.exists())[0];
      console.log(`Bucket ${bucketName} exists: ${bucketExists}`);
      if (!bucketExists) {
        console.log(`Creating bucket: ${bucketName}`);
        await storage.createBucket(bucketName);
      }
    } catch (err) {
      throw new Error('Create bucket operation failed');
    }

    try {
      const client = new admin.firestore.v1.FirestoreAdminClient();
      const name = client.databasePath(process.env.GCLOUD_PROJECT, '(default)');
      const outputUriPrefix = `gs://${bucketName}`;
      console.log(`Exporting ${name} to ${outputUriPrefix}`);
      const responses = await client.exportDocuments({ name, outputUriPrefix });
      const response = responses[0];
      console.log(`Operation Name: ${response.name}`);
      return response;
    } catch (err) {
      console.error(err);
      throw new Error('Export operation failed');
    }
  });

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

// Firebase Setup
const serviceAccount = require('./service-account.json');

const appId = 'nj-career-network-dev3';
// TODO: remove hardcoded env settings

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${appId}.firebaseio.com`,
});

const OAUTH_SCOPES = ['r_basicprofile', 'r_emailaddress'];

/**
 * Creates a configured LinkedIn API Client instance.
 */
function linkedInClient() {
  // LinkedIn OAuth 2 setup
  // TODO: Configure the `linkedin.client_id` and `linkedin.client_secret` Google Cloud environment variables.
  return require('node-linkedin')(
    functions.config().linkedin.client_id,
    functions.config().linkedin.client_secret,
    `https://${appId}.firebaseapp.com/popup`
  );
}

/**
 * Redirects the User to the LinkedIn authentication consent screen. ALso the 'state' cookie is set for later state
 * verification.
 */
exports.redirect = functions.https.onRequest((req, res) => {
  const Linkedin = linkedInClient();

  cookieParser()(req, res, () => {
    const state = req.cookies.state || crypto.randomBytes(20).toString('hex');
    console.log('Setting verification state:', state);
    res.cookie('state', state.toString(), {
      maxAge: 3600000,
      secure: true,
      httpOnly: true,
    });
    Linkedin.auth.authorize(res, OAUTH_SCOPES, state.toString());
  });
});

/**
 * Exchanges a given LinkedIn auth code passed in the 'code' URL query parameter for a Firebase auth token.
 * The request also needs to specify a 'state' query parameter which will be checked against the 'state' cookie.
 * The Firebase custom auth token is sent back in a JSONP callback function with function name defined by the
 * 'callback' query parameter.
 */
exports.token = functions.https.onRequest((req, res) => {
  const Linkedin = linkedInClient();

  try {
    return cookieParser()(req, res, () => {
      if (!req.cookies.state) {
        throw new Error(
          'State cookie not set or expired. Maybe you took too long to authorize. Please try again.'
        );
      }
      console.log('Received verification state:', req.cookies.state);
      Linkedin.auth.authorize(OAUTH_SCOPES, req.cookies.state); // Makes sure the state parameter is set
      console.log('Received auth code:', req.query.code);
      console.log('Received state:', req.query.state);
      Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, (error, results) => {
        if (error) {
          throw error;
        }
        console.log('Received Access Token:', results.access_token);
        const linkedin = Linkedin.init(results.access_token);
        linkedin.people.me(async (error, userResults) => {
          if (error) {
            throw error;
          }
          console.log('Auth code exchange result received:', userResults);

          // We have a LinkedIn access token and the user identity now.
          const accessToken = results.access_token;
          const linkedInUserID = userResults.id;
          const profilePic = userResults.pictureUrl;
          const userName = userResults.formattedName;
          const email = userResults.emailAddress;

          // Create a Firebase account and get the Custom Auth Token.
          const firebaseToken = await createFirebaseAccount(
            linkedInUserID,
            userName,
            profilePic,
            email,
            accessToken
          );
          // Serve an HTML page that signs the user in and updates the user profile.
          res.jsonp({
            token: firebaseToken,
          });
        });
      });
    });
  } catch (error) {
    return res.jsonp({ error: error.toString });
  }
});

/**
 * Creates a Firebase account with the given user profile and returns a custom auth token allowing
 * signing-in this account.
 * Also saves the accessToken to the datastore at /linkedInAccessToken/$uid
 *
 * @returns {Promise<string>} The Firebase custom auth token in a promise.
 */
async function createFirebaseAccount(linkedinID, displayName, photoURL, email, accessToken) {
  // The UID we'll assign to the user.
  const uid = `linkedin:${linkedinID}`;

  // Save the access token tot he Firebase Realtime Database.
  const databaseTask = admin
    .database()
    .ref(`/linkedInAccessToken/${uid}`)
    .set(accessToken);

  // Create or update the user account.
  const userCreationTask = admin
    .auth()
    .updateUser(uid, {
      displayName: displayName,
      photoURL: photoURL,
      email: email,
      emailVerified: true,
    })
    .catch(error => {
      // If user does not exists we create it.
      if (error.code === 'auth/user-not-found') {
        return admin.auth().createUser({
          uid: uid,
          displayName: displayName,
          photoURL: photoURL,
          email: email,
          emailVerified: true,
        });
      }
      throw error;
    });

  // Wait for all async task to complete then generate and return a custom auth token.
  await Promise.all([userCreationTask, databaseTask]);
  // Create a Firebase custom auth token.
  const token = await admin.auth().createCustomToken(uid);
  console.log('Created Custom token for UID "', uid, '" Token:', token);
  return token;
}
