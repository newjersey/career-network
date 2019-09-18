const fetch = require('isomorphic-unfetch');

const defaultView = 'API';

// White list of table names, mostly to have one central place for them all
// (for the benefit of airtableDump.js) -- maybe better as some kind of map?
const tableNames = [
  'Actions',
  'Assessment Entries',
  'Assessment Sections',
  'Conditions',
  'Predicates',
  'Quality Checks',
  'Questions',
  'Question Groups',
  'Question Response Options',
  'Tasks',
];

function validateTableName(apiPath) {
  const tableName = apiPath.split('?')[0];

  if (!tableNames.includes(tableName)) {
    throw new Error(`Unknown Airtable table name: ${tableName}`);
  }
}

function addQueryParam(path, param) {
  const separator = path.includes('?') ? '&' : '?';
  const key = Object.keys(param)[0];
  const value = param[key];
  return `${path}${separator}${key}=${value}`;
}

function applyDefaultView(path) {
  const queryString = path.split('?')[1];
  const isViewSpecified =
    queryString &&
    queryString
      .split('&')
      .map(pair => pair.split('=')[0])
      .includes('view');

  if (isViewSpecified) {
    return path;
  }

  return addQueryParam(path, { view: defaultView });
}

async function fetchRecords(apiBase, apiPath) {
  async function fetchRecordsPage(_apiPath, offset) {
    let path = _apiPath;

    if (offset) {
      path = addQueryParam(path, { offset });
    }

    const result = await fetch(`${apiBase}${path}`);

    return result.json();
  }

  validateTableName(apiPath);

  const path = applyDefaultView(apiPath);
  let offset = null;
  let recordsAccum = [];

  do {
    // eslint-disable-next-line no-await-in-loop
    const result = await fetchRecordsPage(path, offset);

    ({ offset } = result);
    recordsAccum = recordsAccum.concat(result.records);
  } while (offset);

  return recordsAccum;
}

module.exports = {
  fetchRecords,
  tableNames,
};
