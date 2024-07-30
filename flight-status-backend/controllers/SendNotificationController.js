const nodemailer = require('nodemailer');
const { google } = require('googleapis');


const CLIENT_ID = "844628407345-t13lt4ln9j1qgnij66qllkmu0m5ns0el.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//04Tp-b7GNzW21CgYIARAAGAQSNgF-L9Ir_RbpkWlu68RP5H6VOzefC5NDORIoKVXupvnaoh1ImAgAEmt5xHyLcJQP7Jeht1wbAA"


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'konikasingh349@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    });
    const mailOptions = {
      from: 'Prince Sen <konikasingh349@gmail.com>',
      to: 'rahulsingh00c@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
      html: '<h1>That was easy!</h1>'
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
module.exports = sendMail;