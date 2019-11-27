# Career Network

## Development

- Ensure `node` is installed
- It is suggested to install an `eslint` plugin for your chosen editor

Clone repo and run (specifying the desired environment, if not `dev1`):

```sh
npm install
cd functions
npm install
cp .runtimeconfig.json-example .runtimeconfig.json
cd ..
npx firebase login
npm run env:dev1
npm run dev
```

Enter your test identity verification secret into `functions/.runtimeconfig.json`

See for identity verification secret info: https://www.intercom.com/help/en/articles/183-enable-identity-verification-for-web-and-mobile

## Testing

Tests reside in the `__tests__` folder and use [`Jest`](https://jestjs.io/) as the main testing framework, as well as
[`React Testing Library`](https://testing-library.com/docs/react-testing-library/intro).

The project contains both unit and integration tests, which can be run separately.

To only run unit tests, execute:

```bash
npm run test:unit
```

The integration tests depend on the Firestore emulator. So, before attempting to run them, you must start an emulator
instance on your local machine:

```bash
npx firebase emulators:start --only firestore
```

Now, you can launch the integration tests by running:

```bash
npm run test:integration
```

If you just want to run all tests, use:

```bash
npm run test
```

## Deployment

Clone repo and install:

```sh
npm install
```

Specify the Firebase project to which you would like to deploy (`ppe` shown here as an example):

```sh
npm run env:ppe
```

Set production Intercom identity verification secret (or test secret if not deploying to production):

```sh
npx firebase functions:config:set intercom.identity_verification_secret="IDENTITY VERIFICATION SECRET"
```

See for identity verification secret info: https://www.intercom.com/help/en/articles/183-enable-identity-verification-for-web-and-mobile

(Optional) Preview the exported static site locally:

```sh
npm run preview
```

If all looks good, ship it:

```sh
npm run deploy
```

### DNS

DNS is maintained by Terraform in the /terraform directory.

For details, see: https://developers.cloudflare.com/terraform/

In a nutshell (API token created at https://dash.cloudflare.com/profile/api-tokens):

```sh
export CLOUDFLARE_API_TOKEN=your-api-token
cd terraform
terraform init
terraform plan
terraform apply
```

### Updating API snapshots

In production, configuration data from Airtable is read
from static JSON files that live in this repo rather than
directly from the Airtable API (for stability reasons
and better versioning of the content).

To update these local JSON files, run:

```sh
npm run airtable:dump
```

To update the live content, commit the changes and deploy normally.

### Scheduled Firestore backups

We've added a mechanism that simplifies creating daily backups of the Firestore database. It works by registering a job
in Google Cloud Scheduler that is executed every 24 hours. This job has an associated cloud function that performs the
actual export and saves the results into a Google Storage bucket.

Here are a few caveats worth having in mind:

- All collections are backed up, and only for the default database (`(default)`).
- The target bucket where the exported documents will be stored needs to follow this convention: `<PROJECT-ID>-backups`.
  So, for example, in the case of the `nj-career-network-dev2` project, the expected bucket name will be
  `nj-career-network-dev2-backups`. Don't forget to create it before attempting to deploy the function.
- The `firestoreBackup` cloud function reads the current project from the `GCLOUD_PROJECT` environment variable that is
  automatically set by the service. This means it's not tied to any specific Firebase project.
- You'll need to check your IAM permissions in the GCP Console to grant access to the default service account for App
  Engine. More specifically, you need to add the role `Cloud Datastore Import Export Admin` and `Storage Admin`;
  otherwise you'll receive a permission error when the scheduled function tries to perform the export.
  See more: https://firebase.google.com/docs/firestore/solutions/schedule-export
- It's advisable to set up error notifications through GCP Stackdriver, to be informed of any execution issuess:
  https://console.cloud.google.com/errors/ (visit this page after deploying the function to enable alerts).

In order to deploy the function, you can run `npm run deploy` from the root project folder (or from within the
`functions` folder, to only deploy the functions and not the rest of the project). It should take care of
building and preparing the code for deployment as well as setting up the scheduler and the necessary permissions in your
account. You might want to view the function in the Firebase "Functions" UI, follow the link to
"View in Cloud Scheduler," and manually run it a couple times to verify proper execution (logs in Firebase UI console).
