const { DataTypes, DATE } = require('sequelize');
const Sequelize = require('../sequelize');

const Department = Sequelize.define(
    'departments', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    faculty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
});

module.exports = Department;