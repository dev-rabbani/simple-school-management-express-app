const express = require("express");
const app = express();

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

// listening port
app.listen(3000);
