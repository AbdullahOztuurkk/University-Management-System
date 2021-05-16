const { Sequelize } = require('sequelize');
const constants = require('./constants/constants');


const connection = new Sequelize(
    constants.DB_NAME,
    constants.DB_USER,
    constants.DB_PASSWORD,
    {
        host: constants.DB_HOST,
        dialect: 'postgres',
        logging: false,
    },
);

connection.authenticate()
    .then(() => {
        console.log('Postgres Connected Successfully'.green.bold);
    }).catch((error) => console.log(`${error}`.red.bold));

module.exports = connection;
