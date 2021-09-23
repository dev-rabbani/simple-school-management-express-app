const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const sercetKey = process.env.SECRET_KEY;

// get all user controller
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length) {
      return res.json({
        msg: "User get successfully",
        users,
      });
    }
    return res.json({
      msg: "user not found",
    });
  } catch (error) {
    return res.json({
      error,
    });
  }
};

// user register controller
const userRegister = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new User(userData);
    const user = await newUser.save();

    return res.json({
      msg: "User created suceessfully",
      user,
    });
  } catch (error) {
    return res.json({
      error,
    });
  }
};

// user login controller
const userLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const data = {
          userName: user.userName,
          email: user.email,
          userRole: user.userRole,
        };
        const token = jwt.sign(data, sercetKey, { expiresIn: "5d" });
        return res.json({
          msg: "User login successfully",
          token,
        });
      }
      return res.json({
        msg: "You are not authenticate user",
      });
    }
  } catch (error) {
    return res.json({
      error,
    });
  }
};

// get all user controller
// const getAllUsers = async (req, res) => {
//   try {
//   } catch (error) {
//     return res.json({
//       error,
//     });
//   }
// };

module.exports = {
  getAllUsers,
  userRegister,
  userLogin,
};
