const express = require('express');
const passport = require('passport');
const router = express.Router();

// import post controller
const postController = require('../controllers/post_controller');

// for /post/create-post route
router.get('/create-post', postController.create);

// for /post/save-post route
router.post('/save-post', postController.save);

module.exports = router;
