// const { createError } = require("../helpers/createError");
const { NotFound } = require("http-errors");
const { Contact } = require("../models/contact");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page, limit, favorite, name, email } = req.query;
  const skip = (page - 1) * limit;

  const searchParams = { owner: _id };

  if (favorite) {
    searchParams.favorite = favorite;
  }
  if (name) {
    searchParams.name = name;
  }
  if (email) {
    searchParams.phone = email;
  }

  const contacts = await Contact.find(searchParams)
    .skip(skip)
    .limit(Number(limit))
    .sort("name")
    .populate("owner", "_id email");
  return res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};
const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw new NotFound("not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const create = async (req, res, next) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    stasus: "success",
    code: 201,
    data: {
      result,
    },
  });
};

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw new NotFound("not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new NotFound("not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new NotFound("not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  getAll,
  getById,
  removeById,
  create,
  updateById,
  updateFavorite,
};
