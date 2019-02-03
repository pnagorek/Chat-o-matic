const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('./server/authentication/passport');
const logger = require('./commons/logger');
const config = require('./configuration/config');
const appName = require('./package.json').name;
const db = require('./server/database/index');
const socket = require('./server/communication/socket');

const usersRouter = require('./server/routing/users');
const roomsRouter = require('./server/routing/rooms');

const PORT = config.get('PORT') || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

app.get(
  '/',
  (req, res, next) => {
    if (!req.user) {
      return res.redirect('/login');
    }
    next();
  },
  (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'main.html'));
  },
);

app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);

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
  socket.init(io);
  db.init()
    .then(() => {
      startServer();
    })
    .catch(() => {
      process.exit(1);
    });
};

init();
