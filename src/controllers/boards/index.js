const ctrlWrapper = require("../../helpers/ctrlWrapper");

const { addBoard } = require("./addBoard");
const { deleteBoard } = require("./deleteBoard");
const { getBoardById } = require("./getBoardById");
const { getBoards } = require("./getBoards");
const { updateBoard } = require("./updateBoard");
const { filterBoardCards } = require("./filterBoardCards");

module.exports = {
  addBoard: ctrlWrapper(addBoard),
  deleteBoard: ctrlWrapper(deleteBoard),
  getBoardById: ctrlWrapper(getBoardById),
  getBoards: ctrlWrapper(getBoards),
  updateBoard: ctrlWrapper(updateBoard),
  filterBoardCards: ctrlWrapper(filterBoardCards),
};
