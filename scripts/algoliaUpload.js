/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const { parse, transform } = require('csv');
const algoliasearch = require('algoliasearch');
const { createReadStream } = require('fs');
const { Writable } = require('stream');
const { startCase, toLower } = require('lodash/fp');

const CSV_PATH = 'data/Employment Prospects data from NJ.csv';
const API_KEY = process.env.ALGOLIA_ADMIN_API_KEY;
const APP_ID = 'GVXRTXREAI';
const INDEX_NAME = 'test_prod_EMPLOYMENT_PROSPECTS';
const DISTINCT_OCCUPATION_INDEX_NAME = 'DISTINCT_OCCUPATION';
const UPLOAD_BATCH_COUNT = 1000;

const client = algoliasearch(APP_ID, API_KEY);
const indexMain = client.initIndex(INDEX_NAME);
const indexDistinct = client.initIndex(DISTINCT_OCCUPATION_INDEX_NAME);

const addObjects = async (objects, index) => {
  const { objectIDs, taskID } = await index.addObjects(objects);
  console.log(`Added ${objectIDs.length} objects (taskID: ${taskID})`);
  return index.waitTask(taskID);
};

const clearIndex = async index => {
  // clear old objects
  const { updatedAt, taskID } = await index.clearIndex();
  console.log(`Clearing index at ${updatedAt} (taskID: ${taskID})`);
  return index.waitTask(taskID);
};

const setSettings = async index => {
  // set settings
  if (index.indexName === DISTINCT_OCCUPATION_INDEX_NAME) {
    const { updatedAt, taskID } = await index.setSettings({
      searchableAttributes: ['Occupation'],
      attributeForDistinct: 'Occupation',
      distinct: 1,
      ignorePlurals: true,
      queryLanguages: ['en'],
      indexLanguages: ['en'],
    });
    console.log(`Setting indexDistinct settings at ${updatedAt} (taskID: ${taskID})`);
    return index.waitTask(taskID);
  }
  if (index.indexName === INDEX_NAME) {
    const { updatedAt, taskID } = await index.setSettings({
      searchableAttributes: ['Occupation'],
      attributesForFaceting: [
        'county',
        'GrowthRates',
        'Total Openings',
        'Education',
        'Work Exp_',
        'meanann',
        'Descriptor',
        'DescriptorRating',
      ],
      ignorePlurals: true,
      queryLanguages: ['en'],
      indexLanguages: ['en'],
    });
    console.log(`Setting indexMain settings at ${updatedAt} (taskID: ${taskID})`);
    return index.waitTask(taskID);
  }
  return Promise.resolve();
};

class Uploader extends Writable {
  constructor() {
    super({
      objectMode: true,
      autoDestroy: true,
    });

    this.objCount = 0;
    this.buffer = [];
    this.tasks = [];
  }

  flushBuffer() {
    this.tasks.push(addObjects(this.buffer, indexMain));
    this.tasks.push(addObjects(this.buffer, indexDistinct));
    this.objCount += this.buffer.length;
    this.buffer = [];
  }

  _write(chunk, encoding, callback) {
    this.buffer.push(chunk);
    if (this.buffer.length === UPLOAD_BATCH_COUNT) {
      this.flushBuffer();
    }
    callback();
  }

  _final(callback) {
    this.flushBuffer();
    console.log(`Queued ${this.objCount} objects for addition across ${this.tasks.length} tasks`);
    Promise.all(this.tasks).then(() => console.log('Done.'));
    callback();
  }
}

const readStream = createReadStream(CSV_PATH);
const uploadStream = new Uploader();

const titleCase = value => startCase(toLower(value));
const makeNumber = value => {
  const number = 1 * value.replace(/[^\d-.]/g, '');

  if (Number.isNaN(number)) {
    throw new Error(`Could not cast to a number: '${value}'`);
  }

  return number;
};

const parser = parse({
  columns: true,
  cast(value, { column, header }) {
    // don't modify headers
    if (header) {
      return value;
    }

    // normalize empty and corrupt values
    if (!value || value === '#N/A') {
      return null;
    }

    // apply transformations
    switch (column) {
      case 'area':
      case '2016 ActualEmp':
      case '2026 ProjEmp':
      case 'NumChange':
      case 'PerChange':
      case 'growrate':
      case 'exits':
      case 'annualexits':
      case 'transfers':
      case 'annualtransfers':
      case 'change':
      case 'annualchange':
      case 'openings':
      case 'annualopenings':
      case 'roundempl':
      case 'mean':
      case 'meanann':
      case 'p25':
      case 'p25ann':
      case 'p50':
      case 'p50ann':
      case 'p75':
      case 'p75ann':
        return makeNumber(value);
      case 'county':
        return titleCase(value);
      default:
        return value;
    }
  },
});

const getDescriptorRating = descriptor => {
  switch (descriptor) {
    case 'Very Favorable':
      return 4;
    case 'Favorable':
      return 3;
    case 'Unfavorable':
      return 2;
    case 'Very Unfavorable':
      return 1;
    default:
      throw new Error(`Unknown descriptor value: "${descriptor}"`);
  }
};

const transformer = transform((record, callback) => {
  // apply filters
  if (record.Occupation === 'Total, All Occupations' || record.county === 'New Jersey Statewide') {
    return callback(null, null);
  }

  // add derrived attributes
  record.DescriptorRating = getDescriptorRating(record.Descriptor);

  // remove unneeded attributes
  delete record.seq;
  delete record.stfips;
  delete record.areatype;
  delete record.FIPS;
  delete record['labor area']; // use numerical 'area' instead
  delete record['NAICS + Industry'];
  delete record.SOC;
  delete record.FIPS_SOC;
  delete record['SOC + Occupation'];
  delete record.EducID;
  delete record.Occlevel;
  delete record.Combined;

  return callback(null, record);
});

console.log(`Updating Algolia app ${APP_ID}, index ${INDEX_NAME}...`);

(async () => {
  await clearIndex(indexMain);
  await clearIndex(indexDistinct);
  await setSettings(indexMain);
  await setSettings(indexDistinct);

  readStream
    .pipe(parser)
    .pipe(transformer)
    .pipe(uploadStream);
})();
