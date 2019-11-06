const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const nodeLinkedin = require('node-linkedin');
const fetch = require('isomorphic-unfetch');
const get = require('lodash/get');
const cors = require('cors')({ origin: true });

const OAUTH_SCOPES = ['r_liteprofile', 'r_emailaddress', 'w_member_social'];
const { projectId } = JSON.parse(process.env.FIREBASE_CONFIG);

function linkedInClient() {
  return nodeLinkedin(
    functions.config().linkedin.client_id,
    functions.config().linkedin.client_secret,
    `https://${projectId}.firebaseapp.com/popup`
  );
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
      secure: false,
      httpOnly: true,
    });
    Linkedin.auth.authorize(res, OAUTH_SCOPES, state.toString());
  });
});

async function createFirebaseAccount(linkedinID, displayName, email, accessToken) {
  const uid = `linkedin:${linkedinID}`;

  // Save the access token tot he Firebase Realtime Database.
  const databaseTask = admin
    .database()
    .ref(`/linkedInAccessToken/${uid}`)
    .set(accessToken);

  try {
    await admin.auth().updateUser(uid, {
      displayName,
      email,
      emailVerified: true,
    });
  } catch (error) {
    console.log('###', error);
    // If user does not exists we create it.
    if (error.code === 'auth/user-not-found') {
      console.log('going to create new user', uid, displayName, email);
      await admin.auth().createUser({
        uid,
        displayName,
        email,
        emailVerified: true,
      });
    } else {
      throw error;
    }
  }

  const createUserInDB = admin
    .firestore()
    .collection('users')
    .doc(uid)
    .set(
      {
        authProfile: { displayName, email, emailVerified: true },
        creationTimestamp: new Date(),
        lastSignInTimestamp: new Date(),
        lastUpdateTimestamp: new Date(),
        isAdmin: false,
        authProviders: {
          'linkedin.com': { id: uid },
        },
      },
      { merge: true }
    );

  // Wait for all async task to complete then generate and return a custom auth token.
  await Promise.all([createUserInDB, databaseTask]);

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

      const userObj = await fetch(`${apiHost}/me?projection=(id,firstName,lastName)`, {
        headers,
      });

      const userJson = await userObj.json();

      const firstName = get(userJson, 'firstName.localized.en_US');
      const lastName = get(userJson, 'lastName.localized.en_US');

      const emailObj = await fetch(
        `${apiHost}/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))`,
        { headers }
      );

      const emailJson = await emailObj.json();

      const email = get(emailJson, 'elements[0].handle~.emailAddress');

      // Create a Firebase account and get the Custom Auth Token.
      const firebaseToken = await createFirebaseAccount(
        userJson.id,
        `${firstName} ${lastName}`,
        email,
        results.access_token
      );

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
