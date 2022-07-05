const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true,
   auth: {
      type: 'OAuth2',
      //   user: process.env.MAIL_USERNAME,
      //   pass: process.env.MAIL_PASSWORD,
      user: process.env.MAIL_EMAIL,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
   }
});


module.exports = transporter;
