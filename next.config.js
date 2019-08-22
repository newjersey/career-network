const env = process.env.NODE_ENV;

const envConfig = {
  dev1: {
    airtable: {
      apiBase: 'https://careers.gardenstate.tech/api/airtable/v0/',
    },
    firebase: {
      apiKey: 'AIzaSyDybN2rwlC_Hwld0SJncFH8preMI4MXKic',
      authDomain: 'nj-career-network-dev1.firebaseapp.com',
      databaseURL: 'https://nj-career-network-dev1.firebaseio.com',
      projectId: 'nj-career-network-dev1',
      storageBucket: 'nj-career-network-dev1.appspot.com',
      messagingSenderId: '81682397202',
      appId: '1:81682397202:web:5caa69d4e9c28d1e',
    },
  },
  dev2: {
    airtable: {
      apiBase: 'https://careers.gardenstate.tech/api/airtable/v0/',
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
    airtable: {
      apiBase: 'https://careers.gardenstate.tech/api/airtable/v0/',
    },
    firebase: {
      apiKey: 'AIzaSyDx21FkVqjXshORafAbzPvv2kACmXhATok',
      authDomain: 'nj-career-network-ppe.firebaseapp.com',
      databaseURL: 'https://nj-career-network-ppe.firebaseio.com',
      projectId: 'nj-career-network-ppe',
      storageBucket: '',
      messagingSenderId: '641946008142',
      appId: '1:641946008142:web:c6d623bc79bc899e',
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
    },
  },
}[env];

module.exports = {
  env: envConfig,
};
