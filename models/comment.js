const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  commentBy: Schema.Types.ObjectId,
  commetBody: String,
});

module.exports = mongoose.model("Comment", commentSchema);