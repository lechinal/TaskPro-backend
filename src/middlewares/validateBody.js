const validateBody = (schema) => {
 const func = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
   throw new Error(`Bad Request: ${error.message}`);
  }

  next();
 };

 return func;
};

module.exports = { validateBody };
