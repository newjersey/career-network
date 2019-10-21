const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const nodeLinkedin = require('node-linkedin');
const fetch = require('isomorphic-unfetch');
const _ = require('lodash');

const cors = require('cors')({
  origin: true,
});

const OAUTH_SCOPES = ['r_liteprofile', 'r_emailaddress', 'w_member_social'];

/**
 * Creates a configured LinkedIn API Client instance.
 */
function linkedInClient() {
  // LinkedIn OAuth 2 setup
  return nodeLinkedin(
    functions.config().linkedin.client_id,
    functions.config().linkedin.client_secret,
    'http://localhost:3000/popup'
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
      secure: false,
      httpOnly: true,
    });
    Linkedin.auth.authorize(res, OAUTH_SCOPES, state.toString());
  });
});

// TODO: it does not saves user in DB now via simulator
/**
 * Creates a Firebase account with the given user profile and returns a custom auth token allowing
 * signing-in this account.
 * Also saves the accessToken to the datastore at /linkedInAccessToken/$uid
 *
 * @returns {Promise<string>} The Firebase custom auth token in a promise.
 */
async function createFirebaseAccount(linkedinID, displayName, email, accessToken) {
  const uid = `linkedin:${linkedinID}`;

  // Save the access token tot he Firebase Realtime Database.
  const databaseTask = admin
    .database()
    .ref(`/linkedInAccessToken/${uid}`)
    .set(accessToken);

  // Create or update the user account.
  const newTask = admin
    .firestore()
    .collection('users')
    .doc(uid)
    .set({ displayName, email, emailVerified: true }, { merge: true })
    .catch(error => {
      console.log('###', error);
      // If user does not exists we create it.
      if (error.code === 'auth/user-not-found') {
        console.log('going to create new user', uid, displayName, email);
        return admin.auth().createUser({
          uid,
          displayName,
          email,
          emailVerified: true,
        });
      }
      throw error;
    });

  const createUserInDB = admin
    .firestore()
    .collection('users')
    .doc(uid)
    .set({ displayName, email, emailVerified: true }, { merge: true });

  // Wait for all async task to complete then generate and return a custom auth token.
  await Promise.all([newTask, createUserInDB]);

  const token = await admin.auth().createCustomToken(uid);
  console.log('Created Custom token for UID "', uid);
  return token;
}

/**
 * Exchanges a given LinkedIn auth code passed in the 'code' URL query parameter for a Firebase auth token.
 * The request also needs to specify a 'state' query parameter which will be checked against the 'state' cookie.
 * The Firebase custom auth token is sent back in a JSONP callback function with function name defined by the
 * 'callback' query parameter.
 */

const apiHost = 'https://api.linkedin.com/v2';
exports.token = functions.https.onRequest((req, res) => {
  const Linkedin = linkedInClient();
  try {
    return cors(req, res, () => {
      cookieParser()(req, res, () => {
        if (!req.cookies.state) {
          throw new Error(
            'State cookie not set or expired. Maybe you took too long to authorize. Please try again.'
          );
        }
        Linkedin.auth.authorize(OAUTH_SCOPES, req.cookies.state); // Makes sure the state parameter is set
        Linkedin.auth.getAccessToken(
          res,
          req.query.code,
          req.query.state,
          async (error, results) => {
            if (error) {
              throw error;
            }
            console.log('Received Access Token:', results.access_token);

            const headers = {
              Authorization: `Bearer ${results.access_token}`,
            };

            const userObj = await fetch(`${apiHost}/me?projection=(id,firstName,lastName)`, {
              headers,
            });

            const userJson = await userObj.json();

            const firstName = _.get(userJson, 'firstName.localized.en_US');
            const lastName = _.get(userJson, 'lastName.localized.en_US');

            const emailObj = await fetch(
              `${apiHost}/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))`,
              { headers }
            );

            const emailJson = await emailObj.json();

            const email = _.get(emailJson, 'elements[0].handle~.emailAddress');

            // Create a Firebase account and get the Custom Auth Token.
            const firebaseToken = await createFirebaseAccount(
              userJson.id,
              `${firstName} ${lastName}`,
              email,
              results.access_token
            );

            res.jsonp({
              token: firebaseToken,
            });
          }
        );
      });
    });
  } catch (error) {
    console.log(error);
    return res.jsonp({ error: error.toString });
  }
});
