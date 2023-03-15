const { User } = require("../models/user");
const createError = require("../helpers/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../helpers/env");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const sendEmail = require("../helpers/sendEmail");

const register = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const verificationToken = v4();
  const hashedPassword = bcrypt.hashSync(password, 10);
  const avatarURL = gravatar.url(email);
  await User.create({
    password: hashedPassword,
    email,
    subscription,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target="_blank" href="http://localhost:8080/api/auth/verify/${verificationToken}">Подтвердить email</a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        verificationToken,
      },
    },
  });
};

const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify) {
    throw createError(
      401,
      "Email is wrong or not verify, or password is wrong"
    );
  }
  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    throw createError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = {
  register,
  login,
  logout,
};
