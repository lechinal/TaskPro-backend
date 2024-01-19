const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const app = express();
const authRouter = require("./src/routes/api/authRouter");

const URL_DB = process.env.URL_DB;
mongoose
 .connect(URL_DB)
 .then(() => {
  console.log("Database connection successful");
 })
 .catch((err) => {
  console.log(`Error: ${err.message}`);
 });

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cors());
app.use(express.json());
app.use(logger(formatsLogger));

app.use("/tmp", express.static(path.join(__dirname, "tmp")));

app.use("/api/user", authRouter);

app.use((_, res, next) => {
 next({ status: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
 res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
