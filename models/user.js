const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", schema);

const schemaRegister = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
});

const schemaLogin = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string().valueOf(["starter", "pro", "business"]).required(),
});

module.exports = {
  User,
  schemaRegister,
  schemaLogin,
  schemaUpdateSubscription,
};
