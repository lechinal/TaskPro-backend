const ctrlWrapper = require("../../helpers/ctrlWrapper");

const { addCard } = require("./addCard");

module.exports = {
  addCard: ctrlWrapper(addCard),
};
