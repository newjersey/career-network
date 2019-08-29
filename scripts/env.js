/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const chalk = require('chalk');
const cmd = require('node-cmd');
const appEnv = require('../src/AppEnv');

const env = process.argv[2];
const { log } = console;

if (env) {
  log(`Switching environment to: ${chalk.green(env)}`);

  // switch Firebase project
  cmd.get(`firebase use ${env}`, (err, data) => {
    if (err) {
      log(chalk.red(err));
    }

    if (data) {
      log(data);

      // switch local config
      appEnv.write(env);

      log('Restart the server to see the changes in effect.');
    }
  });
} else {
  log(`Current environment is: ${chalk.blue(appEnv.read())}`);
}
