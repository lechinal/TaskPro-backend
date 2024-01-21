const ctrlWrapper = require("../../helpers/ctrlWrapper");

const { addColumnInBoard } = require("./addColumnInBoard");
const { deleteColumn } = require("./deleteColumn");
const { getColumns } = require("./getColumns");
const { updateColumn } = require("./updateColumn");

module.exports = {
  addColumnInBoard: ctrlWrapper(addColumnInBoard),
  deleteColumn: ctrlWrapper(deleteColumn),
  getColumns: ctrlWrapper(getColumns),
  updateColumn: ctrlWrapper(updateColumn),
};
