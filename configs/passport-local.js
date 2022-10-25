const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// using local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    (email, password, done) => {
      // find a user to authenticate
      User.findOne({ email: email }, (error, user) => {
        if (error) {
          console.log(`Error in finding user : ${error}`);
          return done(error);
        }

        // if user not found or password doesnt match
        if (!user || user.password != password) {
          console.log(`User not found : ${error}`);
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

// serializing user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializing user
passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => {
    if (error) {
      console.log(`Error finding a user : ${error}`);
      return done(error);
    }

    return done(null, user);
  });
});

// check if user is authenticated
passport.checkAuthentication = (req, res, next) => {
  // if user is signed in
  if (req.isAuthenticated) {
    return next();
  }

  // if user is not signed in
  return res.redirect('/user/sign-in');
};

// set user
passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
