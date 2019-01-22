const mongoose = require('mongoose');

const config = require('../../configuration/config');
const logger = require('../../commons/logger');

const dbName = config.get('DB_NAME');
const user = config.get('DB_USER');
const pass = config.get('DB_PASS');

const init = () => new Promise((resolve, reject) => {
  logger.info(`Connecting to database '${dbName}'...`);

  mongoose.set('useCreateIndex', true);
  mongoose
    .connect(
      config.get('DB_CONNECTION_STRING'),
      {
        useNewUrlParser: true,
        user,
        pass,
        dbName,
      },
    )
    .then(() => {
      logger.info(`Connection to database '${dbName}' established.`);
      resolve();
    })
    .catch((error) => {
      logger.error(`Connection error: ${error}`);
      reject();
    });
});

module.exports = {
  init,
};
