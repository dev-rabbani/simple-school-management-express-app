const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  getSingleStudentById,
  renameSingleStudentById,
  createStudent
} = require("../controller/student");

router.get("/students", getAllStudents);

router.get("/students/:id", getSingleStudentById);
router.get("/students/:id/:name/", renameSingleStudentById);

router.post("/student/create", createStudent)

module.exports = router;
