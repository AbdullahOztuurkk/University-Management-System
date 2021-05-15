const {Sequelize} = require('sequelize');
const constants = require('./constants/constants');


const connection = new Sequelize(
    constants.DB_NAME,
    constants.DB_USER,
    constants.DB_PASSWORD,
    {
        host: constants.DB_HOST,
        dialect: 'postgres',
    },
);

connection.authenticate()
    .then(() => {
        console.log('Postgres Connected');
    }).catch((error) => console.log(error));

module.exports = connection;
