const express = require("express");
const ctrl = require("../../controllers/columns");
const { validateBody } = require("../../middlewares/validateBody");
const { authenticate } = require("../../middlewares/authenticate");
const { schemas } = require("../../schemas/board");

const router = express.Router();

router.post(
  "/:boardId",
  validateBody(schemas.addColumn),
  authenticate,
  ctrl.addColumnInBoard
);

module.exports = router;
