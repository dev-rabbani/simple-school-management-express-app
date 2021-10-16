// External imports
const mongoose = require("mongoose");
const { Schema } = mongoose;

// postSchema
const postSchema = new Schema({
  title: String,
  description: String,
  comment: [
    {
      type: Schema.Types.ObjectId,
      commentBy: String,
      ref: "Comment",
    },
  ],
});

// exports model
module.exports = mongoose.model("Post", postSchema);
