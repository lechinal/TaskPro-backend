const ctrlWrapper = require("../../helpers/ctrlWrapper");

const { addColumnInBoard } = require("./addColumnInBoard");

module.exports = {
  addColumnInBoard: ctrlWrapper(addColumnInBoard),
};
