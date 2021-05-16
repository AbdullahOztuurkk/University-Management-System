const express = require('express');
const morgan = require('morgan');
const constants = require('./constants/constants');
const colors = require('colors');

var app = express();

app.use(express.json())



var port = constants.PORT || 5000;

if (constants.NODE_ENV === 'development') {
    // Morgan logger
    app.use(morgan('tiny'));

    // // Sync database columns
    // const faculty = require('./models/faculty');
    // faculty.sync({ force: true });

    // const department = require('./models/department');
    // department.sync({ force: true });

    // const lesson = require('./models/lesson');
    // lesson.sync({ force: true });

    // const user = require('./models/user');
    // user.sync({ force: true });

    require('./models/faculty').sync({ force: true });

    require('./models/department').sync({ force: true });

    require('./models/lesson').sync({ force: true });

    require('./models/user').sync({ force: true });

    console.log(`All models are synced`.green.bold);
}




app.listen(port, console.log(`Server Running on PORT : ${port} `.green.bold))