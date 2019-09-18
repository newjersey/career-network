/* eslint-disable no-console */

const chalk = require('chalk');
const fs = require('fs');

const { liveAirtableApiBase } = require('../next.config');
const { fetchRecords } = require('../src/airtable');

const { log } = console;
const outDir = './out/api/';

async function saveRecords(apiPath) {
  const filename = `${apiPath.split('?')[0]}`;
  const outPath = `${outDir}${filename}`;

  try {
    const records = await fetchRecords(liveAirtableApiBase, apiPath);
    const json = JSON.stringify({ records });

    fs.writeFile(outPath, json, err => {
      if (err) throw err;
    });

    log(`Wrote ${chalk.green(records.length)} records to ${chalk.blue(outPath)}`);
  } catch (err) {
    log(chalk.red(err));
  }
}

fs.mkdirSync(outDir, { recursive: true });

log(`Downloading Airtable records from ${chalk.blue(liveAirtableApiBase)}\n`);

saveRecords('Predicates?view=API');
saveRecords('Conditions?view=API');
saveRecords('Tasks?view=API');
saveRecords('Actions?view=API');
saveRecords('Quality Checks?view=API');

saveRecords('Assessment%20Sections?view=API');
saveRecords('Assessment%20Entries?view=API');
saveRecords('Questions?view=API');
saveRecords('Question%20Groups?view=API');
saveRecords('Question%20Response%20Options?view=API');
