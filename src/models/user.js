const { DataTypes, DATE } = require('sequelize');
const Sequelize = require('../sequelize');

user = Sequelize.define(
    'user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
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
},
);

initialize = (models) => {

    models.user.prototype.toJSON = function () {
        const values = { ...this.get() };

        delete values.password_salt;
        delete values.password_hash;

        return values;
    };

    // models.user.prototype.setPassword = function (password) {
    //     const { hash, salt } = createSaltHashPassword(password);
    //     this.password_salt = salt;
    //     this.password_hash = hash;
    // };
};

module.exports = { model: user, initialize }