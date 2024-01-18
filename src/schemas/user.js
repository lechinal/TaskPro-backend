const Joi = require("joi");

const registerSchema = Joi.object({
 name: Joi.string().min(2).required(),
 password: Joi.string().min(6).required(),
 email: Joi.string()
  .pattern(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)
  .required(),
});

const loginSchema = Joi.object({
 password: Joi.string().min(6).required(),
 email: Joi.string()
  .pattern(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)
  .required(),
});

const schemasUser = {
 registerSchema,
 loginSchema,
};

module.exports = schemasUser;
