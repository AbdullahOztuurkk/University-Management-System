const { PrismaClient } = require(".prisma/client");
const constants = require('../constants/constants');

const prismaClient = new PrismaClient();

exports.connectDb = async () => {
    main;
}

exports.client = prismaClient;

const main = prismaClient.$connect()
    .then(console.log(`Database : ${constants.DB_NAME} connected successfully on Port : ${constants.DB_PORT}`.green.bold))
    .catch((error) => {
        console.log(`${error}`.red.bold);

    });

