const { Board } = require("../../models/board/board");

const HttpError = require("../../helpers/HttpError");

const deleteCard = async (req, res, next) => {
  const { _id } = req.user;
  const { boardId } = req.params;
  const { _id: cardId } = req.body;
  const { owner } = req.body;

  const { columns } = await Board.findById({
    _id: boardId,
    columnId: _id,
  });

  if (!columns) {
    throw HttpError(404, "Not found");
  }

  const column = columns.find((column) => column.id === owner);

  if (!column) {
    throw HttpError(400, `${owner} is not valid id`);
  }

  await Board.updateOne(
    { _id: boardId, "columns._id": column._id },
    {
      $pull: {
        "columns.$.cards": { _id: cardId },
      },
    }
  );

  res.status(200).json({
    message: "Card deleted saccessfully",
  });
};

module.exports = {
  deleteCard,
};
