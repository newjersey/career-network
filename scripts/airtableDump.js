/* eslint-disable no-console */

const chalk = require('chalk');
const fs = require('fs');

const { liveAirtableApiBase } = require('../next.config');
const { fetchRecords, tableNames } = require('../src/airtable').default;

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

// create output directory, in case it doesn't yet exist
fs.mkdirSync(outDir, { recursive: true });

log(`Downloading Airtable records from ${chalk.blue(liveAirtableApiBase)}\n`);

tableNames.forEach(tableName => saveRecords(tableName));
