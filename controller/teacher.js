const Teacher = require("../models/teacher");

const bcrypt = require("bcrypt");

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
    const { email, pass } = req.body;
    const filterTeacher = await Teacher.findOne({ email });

    if (filterTeacher) {
      res.json({
        msg: "Teacher already exist with this email",
      });
    } else {
      const hassPass = await bcrypt.hash(pass, 10);
      req.body.pass = hassPass;
      const teacher = await new Teacher(req.body)
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

// teacher login controller
const logIn = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const validTeacher = await Teacher.findOne({ email });

    if (validTeacher) {
      const isValid = await bcrypt.compare(pass, validTeacher.pass)
      if (isValid) {
        res.json({
          msg: "Teacher login successfully",
          validTeacher,
        });
      } else {
        res.json({
          msg: "Password does't match",
        });
      }
    } else {
      res.json({
        msg: "Teacher not found",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

// teacher delete controller
const teacherDelete = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const deleteData = await Teacher.findOneAndDelete({ _id: id });
      res.json({
        msg: "Teacher deleted successfully",
      });
    } else {
      res.json({
        msg: "please provide valid data",
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
  logIn,
  teacherDelete,
};
