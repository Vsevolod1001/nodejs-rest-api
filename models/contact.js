const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("contact", schema);
const schemaCreate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.string(),
});
const schemaFavorite = Joi.object({
  favorite: Joi.string().required(),
});

module.exports = {
  Contact,
  schemaCreate,
  schemaFavorite,
};
