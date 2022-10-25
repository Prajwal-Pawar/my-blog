const User = require('../models/user');

// for sign in page
module.exports.signIn = (req, res) => {
  return res.render('sign_in');
};

// for sign up page
module.exports.signUp = (req, res) => {
  return res.render('sign_up');
};

// for creating a user
module.exports.createUser = (req, res) => {
  // checking if password and confirm password matches
  if (req.body.password !== req.body.confirm_password) {
    console.log('Password doesnt match');
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
      return res.redirect('back');
    }
  });
};
