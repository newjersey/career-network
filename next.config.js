const appEnv = require('./src/AppEnv');

let env;

// in production, we pull data from static JSON files rather than directly from Airtable
const liveAirtableApiBase = 'https://careers.gardenstate.tech/airtable/v0/appoZOnpKML2dKjkQ/';
const prodAirtableApiBase = '/api/';

const commonFirebase = {
  userCollection: 'users',
  sentimentEventsCollection: 'sentimentEvents',
  userPreauthorizationCollection: 'userPreauthorizations',
};

const devEnvFactory = index => {
  const projectId = `nj-career-network-dev${index}`;

  return {
    authDomain: `${projectId}.firebaseapp.com`,
    databaseURL: `https://${projectId}.firebaseio.com`,
    projectId,
    storageBucket: `${projectId}.appspot.com`,
    ...commonFirebase,
  };
};

const appEnvironments = {
  dev1: {
    name: 'DEV1',
    showName: true,
    airtable: {
      apiBase: liveAirtableApiBase,
    },
    firebase: {
      apiKey: 'AIzaSyDybN2rwlC_Hwld0SJncFH8preMI4MXKic',
      messagingSenderId: '81682397202',
      appId: '1:81682397202:web:5caa69d4e9c28d1e',
      ...devEnvFactory(1),
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
      messagingSenderId: '529668674367',
      appId: '1:529668674367:web:fe48e3e414bcd5d6',
      ...devEnvFactory(2),
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
      messagingSenderId: '450017172048',
      appId: '1:450017172048:web:fec305434b30fd999f4f55',
      ...devEnvFactory(3),
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
      messagingSenderId: '1072560330051',
      appId: '1:1072560330051:web:afedd0bcac440b3aed8bf6',
      ...devEnvFactory(4),
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
      messagingSenderId: '555215588648',
      appId: '1:555215588648:web:c1f34ead2b56f9b6a6541d',
      ...devEnvFactory(5),
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
      ...commonFirebase,
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
      ...commonFirebase,
    },
  },
  test: {
    firebase: {
      projectId: 'nj-career-network-test',
      userCollection: 'users-test',
      sentimentEventsCollection: 'sentimentEvents-test',
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
