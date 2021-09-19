const express = require("express");
const router = express.Router();

// import all teacher controller
const {
  getSingleTeacherById,
  getAllTeachers,
  renameSingleTeacherById,
  registerTeacher,
} = require("../controller/teacher");

// get all teachers controller
router.get("/teachers", getAllTeachers);

// get single teacher controller
router.get("/teachers/:id", getSingleTeacherById);

// update teacher controller
router.put("/teachers/:id/:name/", renameSingleTeacherById);

// create teacher controller
router.post("/teacher/create", registerTeacher);

module.exports = router;
