/* eslint-disable no-console */
const { Storage } = require('@google-cloud/storage');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

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
