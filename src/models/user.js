const { DataTypes, DATE } = require('sequelize');
const Sequelize = require('../sequelize');

const User = Sequelize.define(
    'users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('Student', 'Teacher', 'Admin'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Active', 'Inactive', 'Graduated', 'Left'),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password_salt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
});

module.exports = User