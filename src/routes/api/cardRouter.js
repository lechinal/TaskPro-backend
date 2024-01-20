const express = require("express");
const ctrl = require("../../controllers/cards/index");
const { validateBody } = require("../../middlewares/validateBody");
const { authenticate } = require("../../middlewares/authenticate");
const { schemas } = require("../../schemas/board");

const router = express.Router();

router.post(
  "/:boardId",
  validateBody(schemas.addCard),
  authenticate,
  ctrl.addCard
);

module.exports = router;
