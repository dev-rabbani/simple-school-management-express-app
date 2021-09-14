const studentModel = require("../models/student");
const allStudents = require("../data/student");

const Student = require('../models/student');

// all student get controller
const getAllStudents = (req, res) => {
  res.send(allStudents);
};

// single student get controller
const getSingleStudentById = (req, res) => {
  let { id } = req.params;

  if (id) {
    let singleStudent = allStudents.filter((std) => id == std.id);
    res.send(singleStudent);
  } else {
    res.send("Please provide valid data");
  }
};

// single student rename controller
const renameSingleStudentById = (req, res) => {
  let { id, name } = req.params;

  if (id) {
    let singleStudent = allStudents.filter((std) => id == std.id);
    singleStudent.map((filterStd) => (filterStd.name = name));
    res.send(singleStudent);
  } else {
    res.send("Please provide valid data");
  }
};

const createStudent = async (req, res) => {
  const student = new Student(req.body);
  const data = await student.save();
  return res.status(201).send(data);
};

// Exports controller
module.exports = {
  getSingleStudentById,
  getAllStudents,
  renameSingleStudentById,
  createStudent,
};
