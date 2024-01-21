const ctrlWrapper = require("../../helpers/ctrlWrapper");

const { addCard } = require("./addCard");
const { deleteCard } = require("./deleteCard");
const { replaceCard } = require("./replaceCard");
const { updateCard } = require("./updateCard");

module.exports = {
  addCard: ctrlWrapper(addCard),
  deleteCard: ctrlWrapper(deleteCard),
  replaceCard: ctrlWrapper(replaceCard),
  updateCard: ctrlWrapper(updateCard),
};
