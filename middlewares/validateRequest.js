const { createError } = require("../helpers/createError");

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createError);
    }
    next();
  };
};

module.exports = {
  validateRequest,
};
