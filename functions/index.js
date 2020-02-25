/* eslint-disable no-console */
const { Storage } = require('@google-cloud/storage');
const admin = require('firebase-admin');
const crypto = require('crypto');
const functions = require('firebase-functions');
const https = require('https');

const { WebClient: SlackWebClient } = require('@slack/web-api');
const { linkedinRedirect, linkedinAuthorize } = require('./linkedinAuth');

// TODO: Swith to using service account ID (with right permission)
// instead of the JSON private key
admin.initializeApp({
  credential: admin.credential.cert(
    // Generate from Firebase console --> Settings --> Service accounts
    // eslint-disable-next-line global-require, import/no-unresolved, import/no-extraneous-dependencies
    require('./service-account.json')
  ),
  databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`,
});

const postSlackMessage = async (conversationId, text, options = {}) => {
  const config = functions.config().slack;
  if (!config) {
    console.log('No Slack config');
    return null;
  }

  const { token } = config;
  if (!config) {
    console.log('No Slack token');
    return null;
  }

  const web = new SlackWebClient(token);

  return web.chat.postMessage({
    channel: conversationId,
    text,
    ...options,
  });
};

// Uses native https package with streams to keep things quick and light.
exports.airtableProxy = functions.https.onRequest((req, res) => {
  const { api_key: apiKey } = functions.config().airtable;
  const options = {
    headers: { Authorization: `Bearer ${apiKey}` },
    host: 'api.airtable.com',
    path: req.url.replace(/^\/api\/airtable/, ''),
  };

  const proxy = https.get(options, result => {
    const resultHeaders = {};
    const getHeader = key => result.headers[key];

    // We don't really need any of these headers to our client, but it's nice metadata to forward.
    // All other headers from Airtable (at the time of writing) are undesirable to forward
    // (e.g. , access-control-allow-methods, server, set-cookie, etc.).
    ['content-type', 'etag', 'x-airtable-has-non-empty-changes-payload'].forEach(key => {
      if (getHeader(key)) {
        resultHeaders[key] = getHeader(key);
      }
    });

    res.writeHead(result.statusCode, result.statusMessage, resultHeaders);

    result.pipe(res, {
      end: true,
    });
  });

  req.pipe(proxy, {
    end: true,
  });
});

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

exports.newUserSlackAlert = functions.auth.user().onCreate(user => {
  const { uid } = user;
  const firebaseUrl = `https://console.firebase.google.com/project/nj-career-network/database/firestore/data/users/${uid}`;
  const getIntercomUrl = () => {
    const query = `{"predicates":[{"comparison":"eq","value":"${uid}","attribute":"user_id","type":"string"},{"type":"role","attribute":"role","comparison":"eq","value":"user_role"}]}`;
    const base64 = Buffer.from(query).toString('base64');
    return `https://app.intercom.io/a/apps/sb5qwtf5/users/segments/all:${base64}`;
  };

  const text = 'New sign up!';
  const blocks = JSON.stringify([
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text,
      },
    },
    {
      type: 'actions',
      block_id: 'newUserSlackAlert',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'View in Intercom',
          },
          style: 'primary',
          url: getIntercomUrl(),
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'View in Firebase',
          },
          url: firebaseUrl,
        },
      ],
    },
  ]);

  return postSlackMessage('CQHGBC4N6', text, { blocks });
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

exports.linkedinRedirect = linkedinRedirect;
exports.linkedinAuthorize = linkedinAuthorize;
