const env = process.env.NODE_ENV || 'development';

const envConfig = {
  development: {
    airtable: {
      apiBase: 'https://careers.gardenstate.tech/api/airtable/v0/',
    },
    firebase: {
      apiKey: 'AIzaSyBW2hLAzSgdv72lKicKcW_j1c86enCi8uU',
      authDomain: 'auth.careers.gardenstate.tech',
      databaseURL: 'https://nj-career-network.firebaseio.com',
      projectId: 'nj-career-network',
      storageBucket: 'nj-career-network.appspot.com',
      messagingSenderId: '114141088298',
      appId: '1:114141088298:web:ce96ec93a41e3d35',
      userCollection: 'users',
      userPreauthorizationCollection: 'userPreauthorizations',
    },
  },
  production: {
    airtable: {
      apiBase: 'https://careers.gardenstate.tech/api/airtable/v0/',
    },
    firebase: {
      apiKey: 'AIzaSyBW2hLAzSgdv72lKicKcW_j1c86enCi8uU',
      authDomain: 'auth.careers.gardenstate.tech',
      databaseURL: 'https://nj-career-network.firebaseio.com',
      projectId: 'nj-career-network',
      storageBucket: 'nj-career-network.appspot.com',
      messagingSenderId: '114141088298',
      appId: '1:114141088298:web:ce96ec93a41e3d35',
      userCollection: 'users',
      userPreauthorizationCollection: 'userPreauthorizations',
    },
  },
}[env];

module.exports = {
  env: envConfig,
};
