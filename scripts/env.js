/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const chalk = require('chalk');
const cmd = require('node-cmd');
const fs = require('fs');
const { parsed: localEnv } = require('dotenv').config();

const env = process.argv[2];
const { log } = console;

log(`Current environment is: ${chalk.blue(localEnv.APP_ENV)}`);

if (env) {
  log(`Switching environment to: ${chalk.green(env)}`);

  // switch local config
  fs.writeFileSync('.appenv', env, 'utf8');

  // switch Firebase project
  cmd.get(`firebase use ${env}`, (err, data) => {
    if (err) {
      log(chalk.red(err));
    }

    if (data) {
      log(data);
    }
  });
}
