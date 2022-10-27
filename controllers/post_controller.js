const Post = require('../models/post');

// for rendering create post page
module.exports.create = (req, res) => {
  // if user is not signed in
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }

  return res.render('create_post');
};

// for saving post
module.exports.save = (req, res) => {
  Post.create(
    {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      user: req.user._id,
    },
    (error, post) => {
      if (error) {
        console.log(`Error in creating post : ${error}`);
        // flash notifications
        req.flash('error', 'Cant create post !');
        return;
      }

      // flash notifications
      req.flash('success', 'Post published successfully !');
      return res.redirect('/');
    }
  );
};

// for viewing posts
module.exports.view = (req, res) => {
  Post.findById(req.params.id)
    .populate('user') // populating user to display username
    .exec((error, post) => {
      if (error) {
        console.log(`Error in finding post : ${error}`);
        // flash notifications
        req.flash('error', 'Cant open post !');
        return;
      }

      return res.render('view_post', {
        post: post,
      });
    });
};
