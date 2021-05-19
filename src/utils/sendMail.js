const nodemailer = require('nodemailer');
const constrants = require('../constants/constants');

const sendEmail = async function (options) {
    const transporter = nodemailer.createTransport({
        host: constrants.SMTP_HOST,
        port: constrants.SMTP_PORT,
        auth: {
            user: constrants.SMTP_EMAIL,
            pass: constrants.SMTP_PASSWORD,
        },
    });

    const message = {
        from: `${constrants.FROM_NAME} <${constrants.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;