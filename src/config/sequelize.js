require('dotenv').config();
const constants = require('../constants/constants');

module.exports = {
  development: {
    url: constants.DB_URL,
    dialect: 'postgres',
  },
  test: {
    url: constants.DB_URL,
    dialect: 'postgres',
  },
  production: {
    url: constants.DB_URL,
    dialect: 'postgres',
  },
};