require('dotenv').config();

const constants = {
    // Application
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,

    // Database
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    DB_URL: process.env.DB_URL,

    // JWT
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    COOKIE_EXPIRE: process.env.COOKIE_EXPIRE,

    // Mail
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_EMAIL: process.env.SMTP_EMAIL,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    FROM_EMAIL: process.env.FROM_EMAIL,
    FROM_NAME: process.env.FROM_NAME,
}

module.exports = constants;