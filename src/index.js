const express = require('express');
const morgan = require('morgan');
const constants = require('./constants/constants');
const colors = require('colors');
const cookieParser = require('cookie-parser');


var app = express();

app.use(express.json());

app.use(cookieParser());

if (constants.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan logger is activated'.green.bold);
}
// Connect db
const { connectDb } = require('./config/prisma-config');
connectDb();

var port = constants.PORT || 5000;


app.listen(port, console.log(`Server Running on Port : ${port}`.green.bold))