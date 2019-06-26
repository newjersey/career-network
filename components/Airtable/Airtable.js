import fetch from 'unfetch';

export default class Airtable {
  fetch = async apiPath => fetch(`${process.env.airtable.apiBase}${apiPath}`);
}
