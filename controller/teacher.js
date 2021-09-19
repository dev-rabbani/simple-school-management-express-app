
const Teacher = require("../models/teacher");

// all teachers aget controller
const getAllTeachers = async (req, res) => {
  try {
    const data = await Teacher.find();
    if (data) {
      res.json({
        msg: "Teahcer get successfully",
        data,
      });
    } else {
      res.json({
        msg: "Data not found for this id",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

// single teacher get controller
const getSingleTeacherById = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await Teacher.findOne({ _id: id });
    if (data) {
      res.json({
        msg: "Teacher get by id successfully",
        data,
      });
    } else {
      res.json({
        msg: "Teacher not found for this id",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

// single teacher reanme controller
const renameSingleTeacherById = async (req, res) => {
  let { id, name } = req.params;
  const renameDataById = await Teacher.findByIdAndUpdate(
    { _id: id },
    { $set: { firstName: name } }
  );
  if (renameDataById) {
    res.json({
      msg: "Teacher rename by id successfully",
      renameDataById,
    });
  } else {
    res.json({
      msg: "Teaher not found with this id",
    });
  }
};

// teacher register controller
const registerTeacher = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);

    const { email } = teacher;
    const filterTeacher = await Teacher.findOne({ email });

    if (filterTeacher) {
      res.json({
        msg: "Teacher already exist with this email",
      });
    } else {
      const data = await teacher.save();
      res.json({
        msg: "Teahcher register successfully",
        data,
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

// exports controller
module.exports = {
  getSingleTeacherById,
  getAllTeachers,
  renameSingleTeacherById,
  registerTeacher,
};
