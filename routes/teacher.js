const express = require("express");
const router = express.Router();

// import all teacher controller
const {
  getSingleTeacherById,
  getAllTeachers,
  renameSingleTeacherById,
  registerTeacher,
  logIn,
  teacherDelete,
} = require("../controller/teacher");

// get all teachers controller
router.get("/teachers", getAllTeachers);

// get single teacher controller
router.get("/teachers/:id", getSingleTeacherById);

// update teacher controller
router.put("/teachers/rename/:id/:name/", renameSingleTeacherById);

//  teacher register controller
router.post("/teacher/register", registerTeacher);

//  teacher  login controller
router.post("/teacher/login", logIn);

//  teacher  delete controller
router.delete("/teacher/delete/:id", teacherDelete);

module.exports = router;
