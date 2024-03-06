import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

/// is folder me sare functions jo api me use ho rahe he

// const getUsers = async (req, res) => {
//   const users = await User.find({});

//   const keyword = req.query.keyword;
//   res.json({
//     success: true,
//     users,
//   });
// };

// const getUser = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findById(id);

//   res.json({
//     success: true,
//     user,
//   });
// };

// const createUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   await User.create({ name, email, password });

//   res.json({
//     success: true,
//     message: "Registered",
//   });
// };

// export { getUser, getUsers, createUser };

////////////////// *********************//////////////////
////////////TODO TODO TODO TODO TODO ////////////////////////
////////////////// *********************//////////////////

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Register first",
      });
    }
    console.log(user);
    let isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Invalid password!",
      });
    }

    sendCookie(user, res, `Welcome back ${user.name}`, 200);
  } catch (error) {
    console.log("error hua");
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "", { expires: new Date(Date.now()) })
      .json({
        success: true,
        user: req.user,
      });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({
        success: false,
        message: "user exist!",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookie(newUser, res, "Registered", 201);
  } catch (error) {
    next(error);
  }
};

const getUserDetails = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export { login, logout, register, getUserDetails };
