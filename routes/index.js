const express = require('express');
const router = express.Router();

// import home controller
const homeController = require('../controllers/home_controller');

// index route
router.get('/', homeController.home);

// user route
router.use('/user', require('./user'));

// post route
router.use('/post', require('./post'));

// comment route
router.use('/comment', require('./comment'));

module.exports = router;
