const express = require('express');
const morgan = require('morgan');
const constants = require('./constants/constants');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const auth = require('./routes/auth.route');
const { connectDb } = require('./config/prisma-config');
const errorHandler = require('./middleware/error');

var app = express();

app.use(express.json());

app.use(cookieParser());

if (constants.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan logger is activated'.green.bold);
}

connectDb();

app.use('/v1/auth', auth);

app.use(errorHandler);

var port = constants.PORT || 5000;


const server = app.listen(port, console.log(`Server Running on Port : ${port}`.green.bold));

process.on('unhandledRejection', (error, promise) => {
    console.log(`ERROR : ${error.message}`.red.bold);
    server.close(() => {
        process.exit(1);
    });
})

