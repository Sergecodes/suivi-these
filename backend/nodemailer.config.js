const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true,
   auth: {
      type: 'OAuth2',
      user: process.env.MAIL_FROM,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
   }
});

// let mailOptions = {
//    from: `Ecole Doctorale STG <${process.env.MAIL_FROM}>`,
//    to: 'sergedurand205@gmail.com',
//    subject: 'Nodemailer Project',
//    text: 'Hi from your nodemailer project',
//    html: '<p>Hi from your nodemailer project</p>'
// };

// transporter.sendMail(mailOptions, function(err, info) {
//    console.log('info is ', info);

//    if (err) {
//       console.error(err);
//    } else {
//       console.log("Email sent successfully");
//    }
// });


module.exports = transporter;
