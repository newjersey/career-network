import fetch from 'unfetch';

const apiBase = 'https://careers.gardenstate.tech/api/airtable/v0/';

export default class Airtable {
  fetch = async apiPath => fetch(`${apiBase}${apiPath}`);
}
