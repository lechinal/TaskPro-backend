const { Board } = require("../../models/board/board");
const HttpError = require("../../helpers/HttpError");

const addBoard = async (req, res, next) => {
 console.log(req.user);
 const { _id: owner } = req.user;
 const { title, icon, background } = req.body;

 const trimedTitle = title.trim();

 const board = await Board.findOne({
  title: trimedTitle,
  owner,
  icon,
  background,
 });

 if (board) {
  throw HttpError(409, "The board whith such title already exist.");
 }

 const result = await Board.create({
  ...req.body,
  owner,
  background,
  icon,
 });

 res.status(201).json(result);
};

module.exports = {
 addBoard,
};

// const addBoard = async (req, res, next) => {
//  const { _id: owner } = req.user;
//  const { title, icon, background } = req.body;

//  const trimmedTitle = title.trim();

//  const board = await Board.findOne({
//   title: trimmedTitle,
//   owner,
//   icon,
//   background,
//  });

//  if (board) {
//   throw HttpError(409, "A board with such title, icon, and background already exists.");
//  }

//  const result = await Board.create({
//   title: trimmedTitle,
//   owner,
//   icon,
//   background,
//  });

//  res.status(201).json(result);
// };

module.exports = {
 addBoard,
};
