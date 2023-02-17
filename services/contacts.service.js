const { Contact } = require("../models/contact");

const getAll = async () => {
  return Contact.find({});
};

const getById = async (id) => {
  return Contact.findById(id);
};

const removeById = async (id) => {
  return Contact.findByIdAndRemove(id);
};

const create = async (data) => {
  return Contact.create(data);
};

const updateById = async (id, data) => {
  return Contact.findById(id, data, { new: true });
};

module.exports = {
  getAll,
  getById,
  removeById,
  create,
  updateById,
};
