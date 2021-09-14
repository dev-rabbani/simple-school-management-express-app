const express = require("express");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const teacherSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  pass: String,
});

module.exports = mongoose.model("teacher", teacherSchema);
