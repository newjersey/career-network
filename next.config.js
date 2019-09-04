const appEnv = require('./src/AppEnv');

let env;

const appEnvironments = {
  dev1: {
    name: 'DEV1',
    showName: true,
    airtable: {
      apiBase: 'https://careers.gardenstate.tech/api/airtable/v0/app2XI6ZoEDPz09im/',
    },
    firebase: {
      apiKey: 'AIzaSyDybN2rwlC_Hwld0SJncFH8preMI4MXKic',
      authDomain: 'nj-career-network-dev1.firebaseapp.com',
      databaseURL: 'https://nj-career-network-dev1.firebaseio.com',
      projectId: 'nj-career-network-dev1',
      storageBucket: 'nj-career-network-dev1.appspot.com',
      messagingSenderId: '81682397202',
      appId: '1:81682397202:web:5caa69d4e9c28d1e',
      userCollection: 'users',
      userPreauthorizationCollection: 'userPreauthorizations',
    },
  },
  dev2: {
    name: 'DEV2',
    showName: true,
    airtable: {
      apiBase: 'https://careers.gardenstate.tech/api/airtable/v0/appOhDXJ6s47Moc1D/',
    },
    firebase: {
      apiKey: 'AIzaSyDVlAiIhoIvBjCFbgai_70f823_7FiUkUQ',
      authDomain: 'nj-career-network-dev2.firebaseapp.com',
      databaseURL: 'https://nj-career-network-dev2.firebaseio.com',
      projectId: 'nj-career-network-dev2',
      storageBucket: 'nj-career-network-dev2.appspot.com',
      messagingSenderId: '529668674367',
      appId: '1:529668674367:web:fe48e3e414bcd5d6',
    },
  },
  ppe: {
    name: 'PREVIEW',
    showName: true,
    airtable: {
      apiBase: 'https://careers.gardenstate.tech/api/airtable/v0/appEWbCvbVBF5ZtKr/',
    },
    firebase: {
      apiKey: 'AIzaSyDx21FkVqjXshORafAbzPvv2kACmXhATok',
      authDomain: 'auth.careers-preview.gardenstate.tech',
      databaseURL: 'https://nj-career-network-ppe.firebaseio.com',
      projectId: 'nj-career-network-ppe',
      storageBucket: '',
      messagingSenderId: '641946008142',
      appId: '1:641946008142:web:c6d623bc79bc899e',
    },
  },
  prod: {
    name: 'PRODUCTION',
    showName: false,
    airtable: {
      apiBase: 'https://careers.gardenstate.tech/api/airtable/v0/appPhpA6Quf0pCBDm/',
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
  test: {
    firebase: {
      projectId: 'nj-career-network-test',
      userCollection: 'users-test',
      userPreauthorizationCollection: 'userPreauthorizations-test',
    },
  },
};

try {
  const key = appEnv.read();
  env = appEnvironments[key];

  if (!key) {
    throw new Error(`Application environment key is empty`);
  }

  if (!env) {
    throw new Error(`Unknown application environment '${key}'`);
  }
} catch (err) {
  throw new Error(`${err.message} – do you need to run 'npm run env:X'?`);
}

module.exports = {
  env,
};
