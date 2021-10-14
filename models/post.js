const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  desc: String,
  image: String,
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
});

module.exports = mongoose.model("Post", postSchema);
