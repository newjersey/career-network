const fetch = require('isomorphic-unfetch');

async function fetchRecords(apiBase, apiPath) {
  async function fetchRecordsPage(offset) {
    let path = apiPath;

    if (offset) {
      const separator = path.includes('?') ? '&' : '?';
      path += `${separator}offset=${offset}`;
    }

    const result = await fetch(`${apiBase}${path}`);

    return result.json();
  }

  let offset = null;
  let recordsAccum = [];

  do {
    // eslint-disable-next-line no-await-in-loop
    const result = await fetchRecordsPage(offset);

    ({ offset } = result);
    recordsAccum = recordsAccum.concat(result.records);
  } while (offset);

  return recordsAccum;
}

module.exports = {
  fetchRecords,
};
