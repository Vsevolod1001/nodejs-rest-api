const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = require("./env");

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "sevant.101@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
