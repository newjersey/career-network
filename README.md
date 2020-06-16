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

Enter your personal secret Airtable API key into `functions/.runtimeconfig.json` (from https://airtable.com/account)

Enter your Intercom test identity verification secret into `functions/.runtimeconfig.json`

See for identity verification secret info: https://www.intercom.com/help/en/articles/183-enable-identity-verification-for-web-and-mobile

Enter LinkedIn App ID and secret into `functions/.runtimeconfig.json`

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

Set Airtable API key (generally only needed in dev, since `npm run airtable:dump` should be used to pull data from Airtable and commit to `public/static/api/` for production deployments).
This is generally only needed if you want to test new Airtable content locally or dump
Airtable content to the persisted data files using the aforementioned command.

```sh
npx firebase functions:config:set airtable.api_key="AIRTABLE API KEY"
```

Set

See for identity verification secret info: https://www.intercom.com/help/en/articles/183-enable-identity-verification-for-web-and-mobile

(Optional) Preview the exported static site locally:

The LinkedIn Auth uses the default service accounts for [signing custom tokens](https://firebase.google.com/docs/auth/admin/create-custom-tokens), if that account don't have the `iam.serviceAccounts.signBlob` permission, you may use [IAM and admin](https://console.cloud.google.com/projectselector2/iam-admin) of the Google Cloud Platform Console to grant it with the necessary permissions.

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

**New method:** DNS is now managed through GCP.

Get a service account key:

1. https://console.cloud.google.com/iam-admin/serviceaccounts?project=nj-career-network
2. Find "terraform" service account
3. Create a new key for the "terraform" service account
4. Move the downloaded key to terraform/credentials
5. Update `google.tf` to reflect the filename of your key (if many people are managing this someday, maybe we instead just each export our key paths to `GOOGLE_CLOUD_KEYFILE_JSON`).

Then the same as above:

```sh
cd terraform
terraform init
terraform plan
terraform apply
```

You must manually configure the DC records (DNSSEC) created by GCP in your registrar:
https://console.cloud.google.com/net-services/dns/zones/njcareers-org?project=nj-career-network

### Updating API snapshots

In production, configuration data from Airtable is read
from static JSON files that live in this repo rather than
directly from the Airtable API (for stability reasons
and better versioning of the content).

To update these local JSON files, run:

```sh
npm run dev
```

Then, in a separate shell:

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

## Big Thanks

Cross-browser Testing Platform and Open Source ❤️ provided by [Sauce Labs](https://saucelabs.com)
