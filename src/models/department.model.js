const {Sequelize , DataTypes} = require('sequelize');
const faculty = require('./faculty.model');

const faculty = sequelize.define('departments' , {
    name : DataTypes.STRING,
    faculty : DataTypes.INT,
});
module.exports = department;