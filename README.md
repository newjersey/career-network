# Career Network

## Development

- Ensure `node` is installed
- It is suggested to install an `eslint` plugin for your chosen editor

Clone repo and run (specifying the desired environment, if not `dev1`):

```sh
npm install
npm run env:dev1
npm run dev
```

## Testing

Tests reside in the `__tests__` folder and use [`Jest`](https://jestjs.io/) as the main testing framework, as well as
[`React Testing Library`](https://testing-library.com/docs/react-testing-library/intro).

The project contains both unit and integration tests, which can be run separately.

To only run unit tests, execute:

```bash
npm run test:unit
```

The integration tests depend on the Firestore emulator. So, before attempting to run them, make sure you've set up the
Firebase tools.

```bash
npx firebase login
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

(Optional) Preview the exported static site locally:

```sh
npm run preview
```

If all looks good, ship it:

```sh
npm run deploy
```

## Continuous Integration

We use [Google Cloud Build](https://cloud.google.com/cloud-build/) to automatically build, test and deploy the
application to the test/development environments. You might want to take a look at the `cloudbuild.yaml` file to know
what steps are performed in the CI environment.

In order to configure a new development environment to be part of the CI workflow, you must follow these steps:

- Set your application environment by issuing the `npm run env:<YOUR_ENV>` command.
- Install the [gcloud command-line tool](https://cloud.google.com/pubsub/docs/quickstart-cli) and configure it to use
  the same project as Firebase.
- Inside the `ci-image` folder, run `gcloud builds submit --config cloudbuild.yaml .`. This will tell Google Cloud to
  build our custom Docker image and store it in its Container Registry. This Docker image is the same as the `npm` image
  provided by Cloud Build, but with Java 8 installed, which is needed to run the Firestore emulator.
- Trigger a new build by pushing a commit, or retry a failed step from Cloud Build Console, if any exists.

If everything is correct, from now on every change in the GitHub repository will trigger a build for your environment,
and code will be deployed when all tests and validations pass.
