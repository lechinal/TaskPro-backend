const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user/user");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
 const { email, password, name } = req.body;
 const user = await User.findOne({ email });

 if (user) {
  throw new Error("Email in use");
 }

 const salt = await bcrypt.genSalt();
 const hashPassword = await bcrypt.hash(password, salt);

 const newUser = await User.create({
  email,
  name,
  password: hashPassword,
 });

 const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: "2h" });

 await User.findByIdAndUpdate(newUser._id, { token });

 res.status(201).json({
  user: {
   email,
   name,
  },
  token,
 });
};

const login = async (req, res) => {
 const { email, password } = req.body;
 const user = await User.findOne({ email });

 if (!user || !(await bcrypt.compare(password, user.password))) {
  throw new Error("Email or password is wrong");
 }

 const payload = { id: user._id };
 const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });

 await User.findByIdAndUpdate(user._id, { token });

 res.status(200).json({
  user: {
   email,
   name: user.name,
  },
  token,
 });
};

const logout = async (req, res) => {
 const user = req.user;

 if (!user) {
  throw new Error("Not authorized");
 }

 user.token = "";
 await User.findByIdAndUpdate(user._id, user);

 res.status(201).json({
  message: "Logout success",
 });
};

const current = async (req, res, next) => {
 const user = req.user;

 if (!user) {
  throw new Error("Not authorized");
 }

 res.status(200).json({
  user: {
   email: user.email,
   name: user.name,
  },
 });
};

module.exports = { register, login, logout, current };
