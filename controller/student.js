const Student = require("../models/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const secretKey = process.env.SECRET_KEY;
const hostEmail = process.env.EMAIL;
const hostEmailPass = process.env.PASS;

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
        const data = {
          email: validStudent.email,
          class: validStudent.class,
        };
        const studentInfoToken = jwt.sign(data, secretKey, { expiresIn: "1h" });
        res.json({
          msg: "Student login successfully",
          validStudent,
          studentInfoToken,
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

// infoUpdateController

const infoUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { pass } = req.body;
    const hashPass = await bcrypt.hash(pass, 10);
    req.body.pass = hashPass;

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

// student get by section and class
const groupBySectionAndClass = async (req, res) => {
  try {
    const { section, class: clsName } = req.body;
    const data = await Student.find({ section, class: clsName });
    res.json({
      msg: `Data found for class ${clsName} and section ${section} students`,
      data,
    });
  } catch (error) {
    error;
  }
};

// get student by age limit
const getStudentByAge = async (req, res) => {
  try {
    const { age } = req.query;
    const ageSplit = age.split("-");
    const [minAge, maxAge] = ageSplit;
    const data = await Student.find({ age: { $gte: minAge, $lte: maxAge } });
    if (data.length) {
      res.json({
        msg: `Student get in the range of ${minAge} to ${maxAge}`,
        data,
      });
    }
    res.json({
      msg: "Student not found",
    });
  } catch (error) {
    error;
  }
};

// forgot password controller
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const isValid = await Student.findOne({ email });

    if (!isValid) {
      res.json({
        msg: "Student not found",
      });
    }

    let otp1 = Math.floor(Math.random() * 8999) + 1000;
    let otp2 = Math.floor(Math.random() * 89) + 10;
    let otp = `${otp1}${otp2}`;

    await Student.updateOne({ otp });

    /*------------------- nodemailer setup------------------*/

    // transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: hostEmail,
        pass: hostEmailPass,
      },
    });

    // mailOptions
    let mailOptions = {
      from: hostEmail,
      to: email,
      subject: "OTP send",
      text: "hello this is test purpose only",
      html: `
      <h2>
        Please check this otp
        <span style="color:blue;font-size:3rem;letter-spacing:.1rem">${otp}
        </span>
      </h2>
      `,
    };

    // send mail
    await transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        return res.json({
          msg: "OTP Sending failed",
          err,
        });
      }
      return res.json({
        msg: `OTP Send successfully with this ${email} email`,
      });
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

// otp check controller
const checkOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const isValid = await Student.findOne({ otp });
    if (!isValid) {
      return res.json({
        msg: "OTP does't match",
      });
    }

    const data = {
      email: isValid.email,
    };
    const token = jwt.sign(data, secretKey, { expiresIn: "1h" });
    return res.json({
      msg: "Otp matched successfully",
      token,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

// reset password

const resetPassword = async (req, res) => {
  try {
    let { newPassword, confirmNewPassword, token } = req.body;
    if (newPassword !== confirmNewPassword) {
      return res.json({
        msg: "Password does't match",
      });
    } else {
      const data = jwt.verify(token, env.process.SECRET_KEY);
      let hashedPass = await bcrypt.hash(newPassword, 10);
      await Student.findOneAndUpdate(
        { email: data.email },
        {
          $set: { pass: hashedPass, otp: "" }
        },
        {
          multi: ture,
        }
      );
      return res.json({
        msg: "Password reset successfully",
      });
    }
  } catch (error) {
    let {  token } = req.body;
    const data = jwt.verify(token, secretKey);
    res.json({
      error,
      data
    });
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
  groupBySectionAndClass,
  getStudentByAge,
  forgotPassword,
  checkOtp,
  resetPassword,
};
