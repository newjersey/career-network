const env = process.env.NODE_ENV || 'development';

const envConfig = {
  development: {
    airtable: {
      apiBase: 'https://careers.gardenstate.tech/api/airtable/v0/',
    },
    firebase: {
    },
  },
  production: {
    airtable: {
      apiBase: 'https://careers.gardenstate.tech/api/airtable/v0/',
    },
    firebase: {
    },
  },
}[env];

module.exports = {
  env: envConfig,
};
