/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const chalk = require('chalk');
const execa = require('execa');
const appEnv = require('../src/AppEnv');

const env = process.argv[2];
const { log } = console;

const set = async () => {
  log(`Switching environment to: ${chalk.green(env)}`);

  try {
    // switch Firebase project
    const { stdout } = await execa('firebase', ['use', env]);
    log(stdout);

    // switch local config
    appEnv.write(env);

    log('Restart the server to see the changes in effect.');
  } catch (err) {
    log(chalk.red(err));
  }
};

const get = () => {
  log(`Current environment is: ${chalk.blue(appEnv.read())}`);
};

if (env) {
  set();
} else {
  get();
}
