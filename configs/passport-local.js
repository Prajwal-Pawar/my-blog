const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// using local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    (email, password, done) => {}
  )
);
