const express = require('express');
const passport = require('passport');
const router = express.Router();

// import comment controller
const commentController = require('../controllers/comment_controller');

// for /comment/create route
router.post('/create', passport.checkAuthentication, commentController.create);

module.exports = router;
