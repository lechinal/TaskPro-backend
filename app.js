const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const corsOptions = require("./cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const app = express();
const authRouter = require("./src/routes/api/authRouter");
const boardRouter = require("./src/routes/api/boardRouter");
const cardRouter = require("./src/routes/api/cardRouter");
const columnRouter = require("./src/routes/api/columnRouter");
const helpRouter = require("./src/routes/api/needHelpRouter");

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

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger(formatsLogger));

app.use("/tmp", express.static(path.join(__dirname, "tmp")));

app.use("/api/user", authRouter);
app.use("/api/board", boardRouter);
app.use("/api/card", cardRouter);
app.use("/api/column", columnRouter);
app.use("/api/column", columnRouter);
app.use("/api", helpRouter);

app.use((_, res, next) => {
 next({ status: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
 res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
