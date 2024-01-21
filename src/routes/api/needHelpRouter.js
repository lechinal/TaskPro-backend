const express = require("express");
const { needHelp } = require("../../controllers/needHelp/needHelp");

const { helpSchema } = require("../../schemas/helpSchema");
const { authenticate } = require("../../middlewares/authenticate");
const { validateBody } = require("../../middlewares/validateBody");

const helpRouter = express.Router();

helpRouter.post("/help", authenticate, validateBody(helpSchema), needHelp);

module.exports = helpRouter;
