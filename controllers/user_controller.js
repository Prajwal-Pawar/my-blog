const User = require('../models/user');

// for rendering sign in page
module.exports.signIn = (req, res) => {
  // if user is signed in
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  return res.render('sign_in');
};

// for rendering sign up page
module.exports.signUp = (req, res) => {
  // if user is signed in
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  return res.render('sign_up');
};

// for creating a user or sign up
module.exports.createUser = (req, res) => {
  // checking if password and confirm password matches
  if (req.body.password !== req.body.confirm_password) {
    console.log('Password doesnt match');
    // flash notifications
    req.flash('error', 'Password doesnt match !');

    return res.redirect('back');
  }

  // find user
  User.findOne({ email: req.body.email }, (error, user) => {
    if (error) {
      console.log(`Error finding a user ${error}`);
      return;
    }

    // if user doesnt exists
    if (!user) {
      // create user
      User.create(req.body, (error, user) => {
        if (error) {
          console.log(`Error creating an user ${error}`);
          return;
        }

        return res.redirect('/user/sign-in');
      });
    } else {
      // flash notifications
      req.flash('error', 'User already exist !');
      return res.redirect('back');
    }
  });
};

// for sign in
module.exports.createSession = (req, res) => {
  // flash notifications
  req.flash('success', 'Successfully signed in !');
  return res.redirect('/');
};

// for sign out
module.exports.destroySession = (req, res) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    // deleting a session cookie
    req.session.destroy((error) => {
      res.clearCookie('myblog');
      return res.redirect('/');
    });
  });
};
