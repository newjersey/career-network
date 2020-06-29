# Activity Templates

## Development

Activity templates are currently entered into Cognito Forms by the content team. Submissions are posted to the cloud function `activityTemplateWebhook` on the preview environment, wherre they are stored on the Preview (ppe) environment's Google Cloud Storage in the `nj-career-network-ppe-activity-templates` bucket.

## Adding templates to the site

The json of the submitted template must be transformed to a json form understood by the frontend (represented by the `ActivityTemplateModel`). To add templates, download them from the google cloud storage and put them in the `activity-templates/original/` directory. Then create the final template json structure by running `node ./scripts/formToTemplate.js`, which will output the final json to a file in the `activity-templates/templates` directory.

After creating the final json files, remove the files from the original directory (or delete the directory).

_NOTE: The template slug is generated using the entry number of the submitted form._

Once the final json files have been generated (they will have their slug as their filename), you can then update the activity templates on the firestore `activityTemplates` collection by running `node ./scripts/updateActivityTemplates.js`.

_Note: the `activity-templates/templates/` directory is the source of truth for what templates are currently on the site. If you delete/update a template from this directory, the change will be reflected on firebase_

You can change the firebase environment you are updating by editing the info found in the `firebaseConfig` for `updateActivityTemplates.js`. You will most likely have to generate a private key and download a `serviceAccount.json`.
