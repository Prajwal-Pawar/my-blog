const express = require('express');
const router = express.Router();

// import user controller
const userController = require('../controllers/user_controller');

// for /user/sign-in route
router.get('/sign-in', userController.signIn);

// for /user/sign-up route
router.get('/sign-up', userController.signUp);

module.exports = router;
