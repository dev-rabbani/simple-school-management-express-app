const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  mobile:String,
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  age:String,
  height:String,
  class:String,
  section:String,
  pass: String,
});

module.exports = mongoose.model('student', studentSchema);