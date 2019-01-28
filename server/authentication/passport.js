const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    (username, password, done) => {
      console.log(username);
      console.log(password);
      console.log('log in');
      return done(null, { username, password });
    },
  ),
);

module.exports = passport;
