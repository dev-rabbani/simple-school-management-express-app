const allTeachers = require("../data/teacher");

const Teacher = require("../models/teacher");

// all teachers aget controller
const getAllTeachers = (req, res) => {
  res.send(allTeachers);
};

// single teacher get controller
const getSingleTeacherById = (req, res) => {
  let { id } = req.params;

  if (id) {
    let singleTeacher = allTeachers.filter((teacher) => teacher.id == id);
    res.send(singleTeacher);
  }
};

// single teacher reanme controller
const renameSingleTeacherById = (req, res) => {
  let { id, name } = req.params;
  if (id) {
    let singleTeacher = allTeachers.filter((teacher) => teacher.id == id);
    singleTeacher.map((filterTeacher) => (filterTeacher.name = name));
    res.send(singleTeacher);
  }
};

const createTeacher = async (req, res) => {
  const teacher = new Teacher(req.body);
  const data = await teacher.save();
  return res.status(201).send(data);
};

// exports controller
module.exports = {
  getSingleTeacherById,
  getAllTeachers,
  renameSingleTeacherById,
  createTeacher
};
