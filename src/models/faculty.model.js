const {Sequelize , DataTypes} = require('sequelize');
const department = require('./department.model');

const faculty = sequelize.define('faculties' , {
    name : DataTypes.STRING,
});

faculty.hasMany(department , {

});

module.exports = faculty;