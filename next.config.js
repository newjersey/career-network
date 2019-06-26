const env = process.env.NODE_ENV || 'development';

const envConfig = {
  development: {
    airtable: {
      apiBase: 'https://careers.gardenstate.tech/api/airtable/v0/',
    },
    firebase: {
      collection: 'users',
      document: 'fLveAGxSbvYej7ybx9g1qoOGfpo2',
    },
  },
  production: {
    airtable: {
      apiBase: 'https://careers.gardenstate.tech/api/airtable/v0/',
    },
    firebase: {
      collection: 'users',
      document: 'fLveAGxSbvYej7ybx9g1qoOGfpo2',
    },
  },
}[env];

module.exports = {
  env: envConfig,
};
