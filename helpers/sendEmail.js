const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY, MY_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  // const email = {
  //   to: data.to,
  //   from: MY_EMAIL,
  //   subject: data.subject,
  //   html: "<p><strong>Test email</strong> from localhost:3000</p>",
  // };
  const email = {...data, from: MY_EMAIL};
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
