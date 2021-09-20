const express = require("express");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const teacherSchema = new Schema({
  firstName: String,
  lastName: String,
  mobile: String,
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  pass:String,
  age: String,
  height: String,
  subject: String,
});

module.exports = mongoose.model("teacher", teacherSchema);
