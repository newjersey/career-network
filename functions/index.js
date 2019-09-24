const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.firestoreBackup = functions.pubsub
  .schedule('every 24 hours')
  .timeZone('America/New_York')
  .onRun(async () => {
    const bucket = `gs://${process.env.GCLOUD_PROJECT}-backups`;
    const client = new admin.firestore.v1.FirestoreAdminClient();
    const formattedName = client.databasePath(process.env.GCLOUD_PROJECT, '(default)');

    await client.exportDocuments({ name: formattedName, outputUriPrefix: bucket });
  });
