// internal imports
const Post = require("../models/post");
const Comment = require("../models/comment");

/**
 * create post
 */
const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();

    res.json({
      msg: "Post created successfully",
      post,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

/**
 * create comment
 */
const createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();

    res.json({
      msg: "Comment created successfully",
      comment,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

// imports
module.exports = {
  createPost,
  createComment,
};
