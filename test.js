// const sgMail = require('@sendgrid/mail')
// require("dotenv").config();
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'LarikUlanov@meta.ua', // Change to your recipient
//   from: 'Larik777taganka@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
// })

//

// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();
// const { SENDGRID_API_KEY, MY_EMAIL } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendEmail = async (data) => {
//   // const email = {
//   //   to: data.to,
//   //   from: MY_EMAIL,
//   //   subject: data.subject,
//   //   html: "<p><strong>Test email</strong> from localhost:3000</p>",
//   // };
//   const email = {...data, from: MY_EMAIL};
//   await sgMail.send(email);
//   return true;
// };

// module.exports = sendEmail;

