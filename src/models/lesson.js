const { DataTypes, DATE } = require('sequelize');
const Sequelize = require('../sequelize');

const Lesson = Sequelize.define(
    'lessons', {
    department: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    credit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
});
module.exports = Lesson;