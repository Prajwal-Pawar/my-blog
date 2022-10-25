const express = require('express');
const passport = require('passport');
const router = express.Router();

// import user controller
const userController = require('../controllers/user_controller');

// for /user/sign-in route
router.get('/sign-in', userController.signIn);

// for /user/sign-up route
router.get('/sign-up', userController.signUp);

// for /user/create-user route
router.post('/create-user', userController.createUser);

// for /user/create-session route
router.post(
  '/create-session',
  // authenticate user using passport
  passport.authenticate('local', { failureRedirect: '/user/sign-in' }),
  userController.createSession
);

// for /user/sign-out route
router.get('/sign-out', userController.destroySession);

module.exports = router;
