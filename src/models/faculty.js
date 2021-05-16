const { DataTypes, DATE } = require('sequelize');
const Sequelize = require('../sequelize');

const Faculty = Sequelize.define(
    'faculties', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
});

module.exports = Faculty