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
  getStudentByAge,
  forgotPassword,
  checkOtp,
  resetPassword
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

// student search by age limit
router.get('/student/search2/',getStudentByAge);

// forgot password
router.post('/student/forgot-password', forgotPassword);

// check otp
router.post('/student/check-otp', checkOtp);

// reset password
router.post('/student/reset-password', resetPassword);

module.exports = router;
