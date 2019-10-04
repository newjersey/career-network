const appEnv = require('./src/AppEnv');

let env;

// in production, we pull data from static JSON files rather than directly from Airtable
const liveAirtableApiBase = 'https://careers.gardenstate.tech/airtable/v0/appoZOnpKML2dKjkQ/';
const prodAirtableApiBase = '/api/';

const appEnvironments = {
  dev1: {
    name: 'DEV1',
    showName: true,
    airtable: {
      apiBase: liveAirtableApiBase,
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
      sentimentEventsCollection: 'sentimentEvents',
      userPreauthorizationCollection: 'userPreauthorizations',
    },
  },
  dev2: {
    name: 'DEV2',
    showName: true,
    airtable: {
      apiBase: liveAirtableApiBase,
    },
    firebase: {
      apiKey: 'AIzaSyDVlAiIhoIvBjCFbgai_70f823_7FiUkUQ',
      authDomain: 'nj-career-network-dev2.firebaseapp.com',
      databaseURL: 'https://nj-career-network-dev2.firebaseio.com',
      projectId: 'nj-career-network-dev2',
      storageBucket: 'nj-career-network-dev2.appspot.com',
      messagingSenderId: '529668674367',
      appId: '1:529668674367:web:fe48e3e414bcd5d6',
      userCollection: 'users',
      sentimentEventsCollection: 'sentimentEvents',
      userPreauthorizationCollection: 'userPreauthorizations',
    },
  },
  dev3: {
    name: 'DEV3',
    showName: true,
    airtable: {
      apiBase: liveAirtableApiBase,
    },
    firebase: {
      apiKey: 'AIzaSyDLDRACEFdWBv7bZudMwFpo-h_BWUJeGgc',
      authDomain: 'nj-career-network-dev3.firebaseapp.com',
      databaseURL: 'https://nj-career-network-dev3.firebaseio.com',
      projectId: 'nj-career-network-dev3',
      storageBucket: 'nj-career-network-dev3.appspot.com',
      messagingSenderId: '450017172048',
      appId: '1:450017172048:web:fec305434b30fd999f4f55',
      userCollection: 'users',
      sentimentEventsCollection: 'sentimentEvents',
      userPreauthorizationCollection: 'userPreauthorizations',
    },
  },
  dev4: {
    name: 'DEV4',
    showName: true,
    airtable: {
      apiBase: liveAirtableApiBase,
    },
    firebase: {
      apiKey: 'AIzaSyA6UY6N8S_oU9rNg_mAPn14fpFS55U7uM0',
      authDomain: 'nj-career-network-dev4.firebaseapp.com',
      databaseURL: 'https://nj-career-network-dev4.firebaseio.com',
      projectId: 'nj-career-network-dev4',
      storageBucket: 'nj-career-network-dev4.appspot.com',
      messagingSenderId: '1072560330051',
      appId: '1:1072560330051:web:afedd0bcac440b3aed8bf6',
      userCollection: 'users',
      sentimentEventsCollection: 'sentimentEvents',
      userPreauthorizationCollection: 'userPreauthorizations',
    },
  },
  dev5: {
    name: 'DEV5',
    showName: true,
    airtable: {
      apiBase: liveAirtableApiBase,
    },
    firebase: {
      apiKey: 'AIzaSyCNdMzlu9heNVkRVD48DovbvnEMOkjLo7s',
      authDomain: 'nj-career-network-dev5.firebaseapp.com',
      databaseURL: 'https://nj-career-network-dev5.firebaseio.com',
      projectId: 'nj-career-network-dev5',
      storageBucket: 'nj-career-network-dev5.appspot.com',
      messagingSenderId: '555215588648',
      appId: '1:555215588648:web:c1f34ead2b56f9b6a6541d',
      userCollection: 'users',
      sentimentEventsCollection: 'sentimentEvents',
      userPreauthorizationCollection: 'userPreauthorizations',
    },
  },
  ppe: {
    name: 'PREVIEW',
    showName: true,
    airtable: {
      apiBase: prodAirtableApiBase,
    },
    firebase: {
      apiKey: 'AIzaSyDx21FkVqjXshORafAbzPvv2kACmXhATok',
      authDomain: 'auth.careers-preview.gardenstate.tech',
      databaseURL: 'https://nj-career-network-ppe.firebaseio.com',
      projectId: 'nj-career-network-ppe',
      storageBucket: '',
      messagingSenderId: '641946008142',
      appId: '1:641946008142:web:c6d623bc79bc899e',
      userCollection: 'users',
      sentimentEventsCollection: 'sentimentEvents',
      userPreauthorizationCollection: 'userPreauthorizations',
    },
  },
  prod: {
    name: 'PRODUCTION',
    showName: false,
    airtable: {
      apiBase: prodAirtableApiBase,
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
      sentimentEventsCollection: 'sentimentEvents',
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
  const key = process.env.NODE_ENV === 'test' ? 'test' : appEnv.read();
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
  liveAirtableApiBase,
};
