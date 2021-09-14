const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  pass: String,
});

module.exports = mongoose.model('student', studentSchema);