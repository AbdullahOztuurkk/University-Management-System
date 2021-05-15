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
}

module.exports = constants;