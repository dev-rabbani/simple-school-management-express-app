// Internal Imports
const Post = require("../models/post");
const Comment = require("../models/comment");

// create post
const createPost = async (req, res) => {
  try {
    if (!req.body) {
      return res.json({
        msg: "Please provide valid data",
      });
    }
    const post = new Post(req.body);
    const data = await post.save();

    return res.json({
      msg: "Post created successfully",
      data,
    });
  } catch (error) {
    return res.json({
      error,
    });
  }
};

// Exports
module.exports = {
  createPost,
};
