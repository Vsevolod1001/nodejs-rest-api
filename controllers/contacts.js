const contactsServices = require("../services/contacts.service");
const { createError } = require("../helpers/createError");

const getAll = async (req, res, next) => {
  try {
    const result = await contactsServices.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServices.getById(id);
    if (!result) {
      throw createError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
};
