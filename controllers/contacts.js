const contactsServices = require("../services/contacts.service");
// const { createError } = require("../helpers/createError");
// const { NetFound } = require("http-errors");

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
    if (result) {
      // throw new NetFound("Not Found");
      return res.json(result);
    } else {
      return res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
};
