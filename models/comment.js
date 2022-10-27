const mongoose = require('mongoose');

// comment schema
const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    // reference to User schema
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    // reference to Post schema
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
