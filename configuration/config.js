const nconf = require('nconf');

nconf.env().defaults({
  PORT: 3000,
  DB_CONNECTION_STRING: 'mongodb+srv://cluster0-p70bv.mongodb.net?retryWrites=true',
  DB_USER: 'user',
  DB_PASS: 'vCyB8sVPHtjFTaRI',
  DB_NAME: 'mydb',
  LOG_PATH: './logs',
});

const get = value => nconf.get(value);

module.exports = {
  get,
};
