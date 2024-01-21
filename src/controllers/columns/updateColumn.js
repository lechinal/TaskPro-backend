const { Board } = require("../../models/board/board");

const HttpError = require("../../helpers/HttpError");

const updateColumn = async (req, res, next) => {
  const { _id } = req.user;
  const { title, boardId, _id: columnId } = req.body;

  const { columns } = await Board.findOne({
    _id: boardId,
    owner: _id,
  });

  if (!columns) {
    throw HttpError(400, `${boardId} is not valid id`);
  }

  const index = columns.findIndex((column) => column.id === columnId);

  if (index === -1) {
    throw HttpError(400, `${columnId} is not valid id`);
  }

  const updateBoard = await Board.updateOne(
    { _id: boardId, owner: _id },
    { $set: { [`columns.${index}.title`]: title } }
  );

  if (updateBoard.modifiedCount === 0) {
    throw HttpError(404);
  }

  const boardGetColumn = await Board.findOne({ _id: boardId, owner: _id });

  res.json(boardGetColumn.columns[index]);
};

module.exports = {
  updateColumn,
};
