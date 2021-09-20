const express = require("express");
const router = express.Router();

// import all student controller
const {
  getAllStudents,
  getSingleStudentById,
  renameSingleStudentById,
  registerStudent,
  logIn,
  studentDelete,
  infoUpdateController,
  groupBySectionAndClass,
  getStudentByAge
} = require("../controller/student");

// get all student routes
router.get("/students", getAllStudents);

// get student by id routes
router.get("/students/:id", getSingleStudentById);

// update student by id rouets
router.put("/students/rename/:id/:name", renameSingleStudentById);

// student register rotues
router.post("/student/register", registerStudent);

// student login rotues
router.post("/student/login", logIn);

// student delete rotues
router.delete("/student/delete/:id", studentDelete);

// student update rotues
router.put("/student/update/:id", infoUpdateController);

// student search by section and class routes
router.post('/student/search/', groupBySectionAndClass);

// 
router.get('/student/search2/',getStudentByAge);

module.exports = router;
