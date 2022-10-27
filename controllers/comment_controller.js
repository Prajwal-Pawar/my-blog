const Post = require('../models/post');
const Comment = require('../models/comment');

// for creating comments
module.exports.create = (req, res) => {
  Post.findById(req.body.post, (error, post) => {
    // if post is there
    if (post) {
      Comment.create(
        {
          comment: req.body.comment,
          post: req.body.post,
          user: req.user._id,
        },
        (error, comment) => {
          if (error) {
            console.log(`Error in creating comment : ${error}`);
            // flash notifications
            req.flash('error', 'Error in adding comment !');
            return;
          }

          // adding comment to post and updating post in db
          post.comments.push(comment);
          post.save();

          // flash notifications
          req.flash('success', 'Comment added successfully !');

          res.redirect('back');
        }
      );
    }
  });
};
