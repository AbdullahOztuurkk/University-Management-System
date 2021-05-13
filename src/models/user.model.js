const {Sequelize , DataTypes} = require('sequelize');

const user = sequelize.define('users' , {
    firstName : DataTypes.STRING(50),
    lastName : DataTypes.STRING(50),
    role : DataTypes.ENUM('Student' , 'Teacher' , 'Admin'),
    status: DataTypes.ENUM('Active' , 'Inactive' , 'Graduated' , 'Left'),
    email : DataTypes.STRING,
    hash : DataTypes.STRING,
    salt : DataTypes.STRING,
});

module.exports = user;