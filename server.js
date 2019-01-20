const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const logger = require('./commons/logger');
const config = require('./configuration/config');
const appName = require('./package.json').name;
const db = require('./server/database/index');

const usersRouter = require('./server/routing/users');

const PORT = config.get('PORT') || 3000;

app.use(express.static('public'));
app.use('/users', usersRouter);

server.on('error', (e) => {
  logger.error(`Server error: ${e.message}`);
  process.exit(1);
});

const greetingMessage = () => {
  logger.info('===========================================');
  logger.info(`${appName.toUpperCase()} initialized and ready to work`);
  logger.info('===========================================');
};

const startServer = () => {
  server.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`);
    greetingMessage();
  });
};

const init = () => {
  // TODO init socket.io

  db.init()
    .then(() => {
      startServer();
    })
    .catch(() => {
      process.exit(1);
    });
};

init();
