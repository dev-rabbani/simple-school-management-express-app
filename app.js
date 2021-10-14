// external imports
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// constant
const app = express();
require("dotenv").config();

// use express json default method
app.use(express.json({ limit: "1mb" }));

app.use(express.urlencoded({ limit: "1mb" }));

// folder static
app.use(express.static("images"));

//import and use post routes
const postRoutes = require("./routes/post");
app.use("/post", postRoutes);

//import and use user routes
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

//import and use student routes
const studentRoutes = require("./routes/student");
app.use(studentRoutes);

//import and use teacher routes
const teacherRoutes = require("./routes/teacher");
app.use(teacherRoutes);

//import and use fileupload routes
const fileUploadRoutes = require("./routes/uploadRoutes");
app.use("/upload", fileUploadRoutes);

// defaults route and controller
app.get("/", (req, res) => {
  res.send("<h2>Welcome to our first node application<h2/>");
});
app.get("*", (req, res) => {
  res.send("<h2>No Data found with this API<h2/>");
});

// conntect mongoose with database
mongoose
  .connect("mongodb://localhost/school")
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

// listening port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
