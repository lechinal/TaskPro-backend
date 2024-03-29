const { Board } = require("../../models/board/board");

const HttpError = require("../../helpers/HttpError");

const deleteColumn = async (req, res, next) => {
  const { _id } = req.user;
  const { boardId, _id: columnId } = req.body;

  const result = await Board.findOneAndUpdate(
    {
      _id: boardId,
      owner: _id,
    },
    { $pull: { columns: { _id: columnId } } },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    message: "Column deleted saccessfully",
  });
};

module.exports = {
  deleteColumn,
};
