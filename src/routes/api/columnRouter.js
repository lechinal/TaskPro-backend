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
router.delete("/", authenticate, ctrl.deleteColumn);
router.get("/", authenticate, ctrl.getColumns);
router.put("/", authenticate, ctrl.updateColumn);

module.exports = router;
