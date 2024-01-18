const jwt = require("jsonwebtoken");
const User = require("../models/user/user");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
 const { authorization = "" } = req.headers;
 const [type, token] = authorization.split(" ");

 if (type !== "Bearer") {
  throw new Error("Token type is not valid");
 }

 if (!token) {
  throw new Error("No token provider");
 }

 try {
  const { id } = jwt.verify(token, SECRET_KEY);
  const user = await User.findById(id);

  if (token !== user.token) {
   throw new Error("Not authorized");
  }

  req.user = user;
 } catch (error) {
  if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
   throw new Error("Not authorized");
  }

  throw error;
 }

 next();
};

module.exports = { authenticate };
