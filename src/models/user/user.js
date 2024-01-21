const { Schema, model } = require("mongoose");

const userSchema = new Schema(
 {
  name: {
   type: String,
   required: [true, "Name is required"],
  },
  email: {
   type: String,
   match: [/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, "User email is not valid"],
   required: [true, "Email is required"],
   unique: true,
  },
  password: {
   type: String,
   minLength: [8, "Password should be at least 8 characters long"],
   maxLength: [64, "The password must not exceed 64 characters"],
   required: [true, "Set a password for the user"],
  },
  token: {
   type: String,
   default: "",
  },
  avatarUrl: {
   type: String,
   default: "",
  },
 },
 {
  timestamps: true,
  versionKey: false,
 }
);

userSchema.post("save", function (error, doc, next) {
 if (error.name === "MongoServerError" && error.code === 11000) {
  next(new Error("Email already exists"));
 } else {
  next(error);
 }
});

const User = model("user", userSchema);

module.exports = User;
