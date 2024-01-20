const express = require("express");

const ctrl = require("../../controllers/boards/index");

const { authenticate } = require("../../middlewares/authenticate");
const { validateBody } = require("../../middlewares/validateBody");

const { schemas } = require("../../schemas/board");

const router = express.Router();

router.post("/", authenticate, validateBody(schemas.addBoard), ctrl.addBoard);
router.delete("/:boardId", authenticate, ctrl.deleteBoard);
router.get("/:boardId", authenticate, ctrl.getBoardById);
router.get("/", authenticate, ctrl.getBoards);
router.put(
  "/:boardId",
  validateBody(schemas.addBoard),
  authenticate,
  ctrl.updateBoard
);
router.patch("/filter/:boardId/:priority", authenticate, ctrl.filterBoardCards);

module.exports = router;
