const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userService = require('../services/userService');
const logger = require('../../commons/logger');

passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    (username, password, done) => {
      if (!username || !password) {
        logger.error('Missing username or password!');
        done(null, false);
      }
      userService
        .findUserByName(username)
        .then((users) => {
          if (users.length === 1) {
            const user = users[0];
            if (user.password !== password) {
              logger.error(`'${username}'' password is invalid!`);
              done(null, false);
            } else {
              logger.info(`'${username}' successfully authenticated!`);
              done(null, user);
            }
          } else {
            logger.error(`'${username}' not found!`);
            done(null, false);
          }
        })
        .catch((err) => {
          logger.error(`Error while logging in user '${username}'; ${err}`);
          done(null, false);
        });
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((name, done) => {
  userService.findUserByName(name).then((users) => {
    done(null, users[0]);
  });
});

module.exports = passport;
