const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const logger = require('./commons/logger');
const config = require('./configuration/config');
const appName = require('./package.json').name;

const PORT = config.get('PORT') || 3000; // config

app.use(express.static('server/public'));

// TODO routing in separate file
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

const startServer = (callback) => {
  server.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`);
    callback();
  });
};

const init = (callback) => {
  // TODO init socket.io

  // TODO establish db connection

  startServer(callback);
};

init(() => {
  logger.info('===========================================');
  logger.info(`${appName} initialized and ready to work`);
  logger.info('===========================================');
});
