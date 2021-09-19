const express = require("express");
const router = express.Router();

// import all student controller
const {
  getAllStudents,
  getSingleStudentById,
  renameSingleStudentById,
  registerStudent
} = require("../controller/student");

// get all student routes
router.get("/students", getAllStudents);

// get student by id routes
router.get("/students/:id", getSingleStudentById);

// update student by id rouets
router.put("/students/rename/:id/:name", renameSingleStudentById);

// register student rotues
router.post("/student/register", registerStudent)

module.exports = router;
