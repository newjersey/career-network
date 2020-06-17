/* eslint-disable no-console */
const functions = require('firebase-functions');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const nodeLinkedinClient = require('node-linkedin');
const fetch = require('isomorphic-unfetch');
const get = require('lodash/get');
const cors = require('cors')({ origin: true });
// Firebase Setup
const admin = require('firebase-admin');

const OAUTH_SCOPES = ['r_liteprofile', 'r_emailaddress'];
const PREVIEW_PROJECT_ID = 'nj-career-network-ppe';
const PROD_PROJECT_ID = 'nj-career-network';

const getCallBackUrl = projectId => {
  switch (projectId) {
    case PREVIEW_PROJECT_ID:
      return `https://preview.njcareers.org/popup`;
    case PROD_PROJECT_ID:
      return `https://njcareers.org/popup`;
    default:
      return `https://${projectId}.firebaseapp.com/popup`;
  }
};

/**
 * Creates a configured LinkedIn API Client instance.
 */
function linkedInClient() {
  // LinkedIn OAuth 2 setup
  // TODO: Configure the `linkedin.client_id` and `linkedin.client_secret` Google Cloud environment variables.
  const config = functions.config().linkedin;
  if (!config) {
    console.log('No linkedin config');
    return null;
  }

  const projectId = process.env.GCLOUD_PROJECT;
  const callbackUrl = getCallBackUrl(projectId);

  return nodeLinkedinClient(
    functions.config().linkedin.client_id,
    functions.config().linkedin.client_secret,
    callbackUrl
  );
}

/**
 * Creates a Firebase account with the given user profile.
 * Saves the accessToken to the datastore at /linkedInAccessToken/$uid
 */
async function createFirebaseAccount(linkedinID, displayName, photoURL, email, accessToken) {
  const linkedinUid = `linkedin:${linkedinID}`;
  let uid = linkedinUid;

  // Save the access token to the Firebase Realtime Database.
  const databaseTask = admin
    .database()
    .ref(`/linkedInAccessToken/${linkedinUid}`)
    .set(accessToken);

  // Create or update the user account.
  const userCreationTask = admin
    .auth()
    .getUserByEmail(email)
    .then(userRecord => {
      console.log('Successfully fetched user data:', userRecord.toJSON());
      uid = userRecord.uid;
      return admin.auth().updateUser(uid, {
        displayName,
        photoURL,
        email,
        emailVerified: true,
      });
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        return admin.auth().createUser({
          uid,
          displayName,
          photoURL,
          email,
          emailVerified: true,
        });
      }
      throw error;
    });
  await Promise.all([userCreationTask, databaseTask]);
  return uid;
}

/**
 * Returns a custom auth token allowing signing-in this account.
 *
 * @returns {Promise<string>} The Firebase custom auth token in a promise.
 */
async function getFirebaseToken(linkedinID, uid, displayName, photoURL, email) {
  const createUserInDB = admin
    .firestore()
    .collection('users')
    .doc(uid)
    .set(
      {
        authProfile: { displayName, email, photoURL, emailVerified: true },
        creationTimestamp: new Date(),
        lastSignInTimestamp: new Date(),
        lastUpdateTimestamp: new Date(),
        isAdmin: false,
        authProviders: {
          'linkedin.com': { id: linkedinID },
        },
      },
      { merge: true }
    );

  await createUserInDB;
  // Create a Firebase custom auth token.
  const token = await admin.auth().createCustomToken(uid);
  console.log('Created Custom token for UID "', uid, '" Token:', token);
  return token;
}

/**
 * Redirects the User to the LinkedIn authentication consent screen. ALso the 'state' cookie is set for later state
 * verification.
 */
exports.linkedinRedirect = functions.https.onRequest((req, res) => {
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
const apiHost = 'https://api.linkedin.com/v2';
// eslint-disable-next-line consistent-return
exports.linkedinAuthorize = functions.https.onRequest((req, res) => {
  const Linkedin = linkedInClient();
  try {
    Linkedin.auth.authorize(OAUTH_SCOPES, req.query.state); // Makes sure the state parameter is set
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, async (error, results) => {
      if (error) {
        throw error;
      }

      const headers = {
        Authorization: `Bearer ${results.access_token}`,
      };

      const userObj = await fetch(
        `${apiHost}/me?projection=(id,firstName,lastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))`,
        {
          headers,
        }
      );

      const userJson = await userObj.json();
      const firstName = get(userJson, 'firstName.localized.en_US');
      const lastName = get(userJson, 'lastName.localized.en_US');
      const displayName = `${firstName} ${lastName}`;

      // Put a placeholder url if user don't have a profile picture
      const photoURL = userJson.profilePicture
        ? userJson.profilePicture['displayImage~'].elements[3].identifiers[0].identifier
        : 'https://njcareers.org/';

      const emailObj = await fetch(
        `${apiHost}/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))`,
        { headers }
      );

      const emailJson = await emailObj.json();

      const email = get(emailJson, 'elements[0].handle~.emailAddress');

      const uid = await createFirebaseAccount(
        userJson.id,
        displayName,
        photoURL,
        email,
        results.access_token
      );

      const firebaseToken = await getFirebaseToken(userJson.id, uid, displayName, photoURL, email);

      return cors(req, res, () => {
        res.json({
          token: firebaseToken,
        });
      });
    });
  } catch (error) {
    console.log(error);
    return res.jsonp({ error: error.toString });
  }
});
