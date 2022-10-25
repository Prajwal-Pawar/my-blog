const express = require('express');
const router = express.Router();

// import home controller
const homeController = require('../controllers/home_controller');

// index route
router.get('/', homeController.home);

module.exports = router;
