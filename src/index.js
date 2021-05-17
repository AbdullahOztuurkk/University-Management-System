const express = require('express');
const morgan = require('morgan');
const constants = require('./constants/constants');

var app = express();

app.use(express.json())

var port = constants.PORT || 5000;

if (constants.NODE_ENV === 'development')
    app.use(morgan('tiny'));

app.listen(port, console.log(`Server Running on PORT : ${port} `))