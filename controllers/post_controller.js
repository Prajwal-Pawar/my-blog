const Post = require('../models/post');
const Comment = require('../models/comment');

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
    .populate({
      path: 'comments',
      populate: { path: 'user' },
    }) // nested populating user for comments to display username
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

// for deleting posts
module.exports.delete = (req, res) => {
  Post.findById(req.params.id, (error, post) => {
    // if post author and user is same
    if (post.user == req.user.id) {
      // remove post
      post.remove();
      // remove comments on post too
      Comment.deleteMany(
        {
          post: req.params.id,
        },
        (error) => {
          // flash notifications
          req.flash('success', 'Post deleted successfully !');
          return res.redirect('back');
        }
      );
    } else {
      return res.redirect('back');
    }
  });
};

// for rendering edit post page
module.exports.edit = (req, res) => {
  // if user is not signed in
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }

  Post.findById(req.params.id, (error, post) => {
    if (error) {
      console.log(`Error in finding post : ${error}`);
      // flash notifications
      req.flash('error', 'Error in finding post !');
      return;
    }

    // if post author and user is same
    if (post.user == req.user.id) {
      return res.render('edit_post', {
        post: post,
      });
    } else {
      return res.redirect('back');
    }
  });
};

// for updating posts
module.exports.update = (req, res) => {
  // find post by id
  Post.findById(req.params.id, (error, post) => {
    // if post author and user is same
    if (post.user == req.user.id) {
      post.updateOne(req.body, (error) => {
        if (error) {
          console.log(`Error in updating post : ${error}`);
          // flash notifications
          req.flash('error', 'Error in updating post !');
          return;
        }

        // flash notifications
        req.flash('success', 'Post updated successfully !');

        return res.redirect('/');
      });
    } else {
      return res.redirect('/');
    }
  });
};
