const fs = require('fs');

const FILE_NAME = '.appenv';
const FILE_FORMAT = 'utf8';

// Returns the name of the application environment.
function read() {
  let appEnv = fs.readFileSync(FILE_NAME, FILE_FORMAT);
  appEnv = appEnv.trim();

  return appEnv;
}

// Locally persists the name of the application environment.
function write(appEnv) {
  fs.writeFileSync(FILE_NAME, appEnv, FILE_FORMAT);
}

module.exports = { read, write };
