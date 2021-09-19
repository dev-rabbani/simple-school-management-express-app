const express = require("express");
const app = express();
require("dotenv").config();

const mongoose = require("mongoose");

const bodyParser = require('body-parser')

app.use(bodyParser.json())

//import student routes
const studentRoutes = require("./routes/student");

//import teacher routes
const teacherRoutes = require("./routes/teacher");

// students
app.use(studentRoutes);

// teachers
app.use(teacherRoutes);

// defaults route and controller
app.get("/", (req, res) => {
  res.send("<h2>Welcome to our first node application<h2/>");
});
app.get("*", (req, res) => {
  res.send("<h2>No Data found with this API<h2/>");
});

mongoose
  .connect("mongodb://localhost/school")
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

// listening port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
