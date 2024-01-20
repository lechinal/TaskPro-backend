const { Board } = require("../../models/board/board");
const mongoose = require("mongoose");

const HttpError = require("../../helpers/HttpError");

const addCard = async (req, res, next) => {
  const { _id } = req.user;
  const { boardId } = req.params;
  const { columnId } = req.body;

  const newObjectId = new mongoose.Types.ObjectId();

  const { columns } = await Board.findById({
    _id: boardId,
    columnId: _id,
  });
  console.log(columnId);
  console.log(columns);

  if (!columns) {
    throw HttpError(404, "Not found");
  }

  const column = columns.find((column) => column.id === columnId);

  if (!column) {
    throw HttpError(400, `${columnId} is not valid id`);
  }

  await Board.updateOne(
    { _id: boardId, "columns._id": column._id },
    {
      $push: {
        "columns.$.cards": { _id: newObjectId, columnId, ...req.body },
      },
    }
  );

  const boardGetCard = await Board.findById({ _id: boardId, columnId: _id });
  const result = boardGetCard.columns
    .find((column) => column.id === columnId)
    .cards.find((card) => card._id.toString() === newObjectId.toString());

  res.status(201).json(result);
};

module.exports = {
  addCard,
};
