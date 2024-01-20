const Joi = require("joi");
const dateRegexp = /^\d{2}\/\d{2}\/\d{4}$/;

const addBoard = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  icon: Joi.string().required(),
  background: Joi.object({
    min: Joi.string().required(),
    desktop: Joi.string().required(),
    tablet: Joi.string().required(),
    mobile: Joi.string().required(),
  }),
});

const addColumn = Joi.object({
  title: Joi.string().min(3).max(100).required(),
});

const addCard = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  text: Joi.string().min(3).max(300).required(),
  deadline: Joi.string().pattern(dateRegexp).required(),
  owner: Joi.string().required(),
  priority: Joi.string().required(),
});

const schemas = {
  addBoard,
  addColumn,
  addCard,
};

module.exports = {
  schemas,
};
