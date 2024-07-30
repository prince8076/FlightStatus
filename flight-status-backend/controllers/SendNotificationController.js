const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = "844628407345-t13lt4ln9j1qgnij66qllkmu0m5ns0el.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04Tp-b7GNzW21CgYIARAAGAQSNgF-L9Ir_RbpkWlu68RP5H6VOzefC5NDORIoKVXupvnaoh1ImAgAEmt5xHyLcJQP7Jeht1wbAA";

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(users) {
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
        accessToken: accessToken.token
      }
    });

    // Send an email to each user
    const emailPromises = users.map(user => {
      const mailOptions = {
        from: 'Prince Sen <konikasingh349@gmail.com>',
        to: user.recipient,
        subject: 'Flight Update Notification',
        text: `Dear user, your flight ${user.flight_id} has been updated.`
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);
    console.log('Emails sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = sendMail;
