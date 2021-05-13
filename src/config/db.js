const { Sequelize } = require("sequelize");
const colors=require('colors');
require("dotenv").config({ path: './.env' });

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		dialect: "postgres",
	}
);

try {
    sequelize.authenticate();
	console.log("Connection has been established successfully.".bold.yellow);
} catch (error) {
	console.error("Unable to connect to the database:", error);
}
