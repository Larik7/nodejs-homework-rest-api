const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async () => {
  const msg = {
    to: "LarikUlanov@meta.ua",
    from: "Larik777taganka@gmail.com",
    subject: "Sending with SendGrid is Fun",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
    return true;
};

// SENDGRID_API_KEY=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

module.exports = sendEmail;
