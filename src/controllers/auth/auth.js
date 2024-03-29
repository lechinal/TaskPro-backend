const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const User = require("../../models/user/user");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const HttpError = require("../../helpers/HttpError");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Error("Email in use");
  }

  const avatarUrl = gravatar.url(email, { s: "200", r: "pg", d: "identicon" });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    email,
    name,
    password: hashPassword,
    avatarUrl,
  });

  const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: "2h" });

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    message: "Registration success",
    user: {
      email,
      name,
      avatarUrl,
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
    message: "Login success",
    user: {
      email,
      name: user.name,
      avatarUrl: user.avatarUrl,
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
    message: "User current success",
    user: {
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
    },
  });
};
const updateUser = async (req, res) => {
  try {
    const updateData = req.body;

    if (!updateData || typeof updateData !== "object") {
      throw new Error("Invalid update data format");
    }

    let avatarUrl = req.user.avatarUrl;

    if (req.file) {
      avatarUrl = req.file.filename;
    }

    const bodyUpdate = { avatarUrl };

    if (updateData.password) {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(updateData.password, salt);
      bodyUpdate.password = hashPassword;
    }

    if (updateData.email) {
      bodyUpdate.email = updateData.email;
    }

    if (updateData.name) {
      bodyUpdate.name = updateData.name;
    }

    const result = await User.findByIdAndUpdate(req.user._id, bodyUpdate, {
      new: true,
    });

    res.status(200).json({
      message: "User update success",

      user: {
        email: result.email,
        name: result.name,
        avatarUrl: result.avatarUrl,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid request data" });
  }
};

const theme = async (req, res) => {
  const { _id } = req.user;

  const { theme } = req.body;

  if (!theme) {
    res.status(400).json({ message: "missing field theme" });
    return;
  }

  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    theme: result.theme,
  });
};

module.exports = {
  register,
  login,
  logout,
  current,
  updateUser,
  theme: ctrlWrapper(theme),
};
