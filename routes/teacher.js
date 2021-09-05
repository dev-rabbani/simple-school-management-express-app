const express = require("express");
const router = express.Router();

const {
  getSingleTeacherById,
  getAllTeachers,
  renameSingleTeacherById,
} = require("../controller/teacher");

router.get("/teachers", getAllTeachers);
router.get("/teachers/:id", getSingleTeacherById);
router.get("/teachers/:id/:name", renameSingleTeacherById);


module.exports = router;