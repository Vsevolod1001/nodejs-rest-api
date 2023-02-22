require("dotenv").config();

const { PORT, BD_HOST } = process.env;

module.exports = {
  PORT,
  BD_HOST,
};
