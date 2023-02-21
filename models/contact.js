const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", schema);

const schemaCreate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const schemaFavorite = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  Contact,
  schemaCreate,
  schemaFavorite,
};
