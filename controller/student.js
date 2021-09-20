const Student = require("../models/student");
const bcrypt = require("bcrypt");

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
    const { email, pass } = req.body;
    const filterStudent = await Student.findOne({ email });
    if (filterStudent) {
      res.json({
        msg: "Student already exist on this email",
        filterStudent,
      });
    } else {
      const hasedPass = await bcrypt.hash(pass, 10);
      req.body.pass = hasedPass;
      const student = new Student(req.body);
      const data = await student.save();
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

// student login controller

const logIn = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const validStudent = await Student.findOne({ email });

    if (validStudent) {
      const isValid = bcrypt.compare(pass, validStudent.pass);
      if (isValid) {
        res.json({
          msg: "Student login successfully",
          validStudent,
        });
      } else {
        res.json({
          msg: "password does't match",
        });
      }
    } else {
      res.json({
        msg: " Student not found ",
      });
    }
  } catch (error) {
    res.josn({
      error,
    });
  }
};

// student delete controller
const studentDelete = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const deleteData = await Student.findOneAndDelete({
        _id: id,
      });
      res.json({
        msg: "Student deleted successfully",
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

const infoUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findOneAndUpdate(
      { _id: id },
      {
        $set: req.body,
      },
      {
        multi: true,
      }
    );
    return res.json({
      message: "Student info updated successfully",
      data: req.body,
    });
  } catch (error) {
    error;
  }
};

// Exports controller
module.exports = {
  getSingleStudentById,
  getAllStudents,
  renameSingleStudentById,
  registerStudent,
  logIn,
  studentDelete,
  infoUpdateController,
};
