const express = require('express');
const router = express.Router();

// import home controller
const homeController = require('../controllers/home_controller');

// index route
router.get('/', homeController.home);

// user route
router.use('/user', require('./user'));

module.exports = router;
