// External Imports
const mongoose = require("mongoose");
const { Schema } = mongoose;

// commentSchema
const commentSchema = new Schema({
  commetBody: String,
});


// Exports
module.exports = mongoose.model("Comment", commentSchema);