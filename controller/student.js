const Student = require("../models/student");

// all student get controller
const getAllStudents = async (req, res) => {
  try {
    const data = await Student.find();
    if (data) {
      res.json({
        msg: "Students get successfully",
        data,
      });
    } else {
      res.json({
        msg: "Student not found",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

// single student get controller
const getSingleStudentById = async (req, res) => {
  try {
    let { id } = req.params;
    const data = await Student.findOne({ _id: id });
    if (data) {
      res.json({
        msg: "Student get by id successfully",
        data,
      });
    } else {
      res.json({
        msg: "Student get by id successfully",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

// single student rename controller
const renameSingleStudentById = async (req, res) => {
  try {
    let { id, name } = req.params;
    const renameStudentBydId = await Student.findByIdAndUpdate(
      { _id: id },
      { $set: { firstName: name } }
    );

    if (renameStudentBydId) {
      res.json({
        msg: "Student get by id and rename successfully",
        renameStudentBydId,
      });
    } else {
      res.json({
        msg: "Please provide valid data",
      });
    }
  } catch (error) {
    error;
  }
};

// register student controller
const registerStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const { email } = newStudent;

    const filterStudent = await Student.findOne({ email });

    if (filterStudent) {
      res.json({
        msg: "Student already exist on this email",
        filterStudent,
      });
    } else {
      const data = await newStudent.save();
      res.json({
        msg: "Student Register Successfully",
        data,
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

// Exports controller
module.exports = {
  getSingleStudentById,
  getAllStudents,
  renameSingleStudentById,
  registerStudent,
};
