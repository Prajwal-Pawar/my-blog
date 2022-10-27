const Post = require('../models/post');

// for rendering home page
module.exports.home = (req, res) => {
  // display posts
  Post.find({})
    .populate('user') // populating user to display username
    .exec((error, posts) => {
      return res.render('home', {
        // posts: posts,
        posts,
      });
    });
};
