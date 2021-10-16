// Internal imports
const Post = require("../models/post");
const Comment = require("../models/comment");

// create comment
const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { commentBody } = req.body;

    const comment = new Comment(req.body);
    const data = await comment.save();

    await Post.findOneAndUpdate(
      { _id: id },
      { $push: { commentBody } },
      { multi: true }
    );

    return res.json({
      msg: "Comment create and updated successfully",
    });
  } catch (error) {
    return res.json({
      error,
    });
  }
};

// get comment with populate

const getComment = async (req, res) => {
  try {
    const { id } = req.params;

    await Post.findOne({ _id: id })
      .populate("comment")
      .exec((err, data) => {
        if (err) {
          return res.json({
            msg: "find and populate error",
          });
        }
        return res.json({
          msg: "Populate successfully",
          data,
        });
      });
  } catch (error) {
    return res.json({
      error,
    });
  }
};

module.exports = {
  createComment,
  getComment,
};
