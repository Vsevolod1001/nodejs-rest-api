require("dotenv").config();

const { PORT, BD_HOST, SECRET_KEY, SENDGRID_API_KEY } = process.env;

module.exports = {
  PORT,
  BD_HOST,
  SECRET_KEY,
  SENDGRID_API_KEY,
};
