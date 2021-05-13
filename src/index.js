const express=require('express');
const morgan=require('morgan');
const connectDb = require('./config/sequilizeDb');

require('dotenv').config({path: '../.env'});

var app=express();

app.use(express.json())

// db connection

//Routes Settings
app.use('/api/users',UserRoutes);
app.use('/api/lecturers',LecturerRoutes);
app.use('/api/lessons',LessonRoutes);
app.use('/api/lecturerlessons',LecturerLessonRoutes);
app.use('/api/grades',GradeRoutes);

var port=process.env.PORT || 5000;

if(process.env.NODE_ENV === 'development')
    app.use(morgan('tiny'));

app.listen(port,console.log(`Server Running on PORT : ${port} `))