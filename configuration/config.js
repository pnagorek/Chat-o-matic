const nconf = require('nconf');

nconf.env().defaults({
  PORT: 3000,
  LOG_PATH: './logs',
});

const get = value => nconf.get(value);

module.exports = {
  get,
};
