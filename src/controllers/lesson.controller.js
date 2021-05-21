const { client } = require('../config/prisma-config');
const asyncHandler = require('../middleware/async');
const { Lesson } = require('../models/lesson/lesson.model');
const ErrorResponse = require('../utils/ErrorResponse');

exports.getById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    const lesson = await client.lesson.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            code:true,
            credit:true,
            department: {
                select: {
                    id: true,
                    name: true,
                    slugifyName: true,
                },
            },
        },

    });

    res.status(200).json({
        success: true,
        data: lesson,
    });

});

exports.getAll = asyncHandler(async (req, res, next) => {
    
    const lessons = await client.lesson.findMany({
        select: {
            id: true,
            name: true,
            code:true,
            credit:true,
            departments: {
                select: {
                    id: true,
                    name: true,
                    slugifyName: true,
                },
            },
        },
    });


    res.status(200).json({
        success: true,
        data: lessons,
        count:lessons.count
    });

});

exports.create = asyncHandler(async (req, res, next) => {
    
    const lessonModel = new Lesson(req.body);

    const created = await client.lesson.create({
        data: lessonModel,
    });

    res.status(200).json({
        success: true,
        data: created,
    });

});

exports.delete = asyncHandler(async (req, res, next) => {
    
    const id = parseInt(req.params.id);

    const deleted = await client.lesson.delete({
        where: {
            id: id,
        },
    });

    res.status(200).json({
        success: true,
        message: `${deleted.name} başarıyla silindi.`,
    })
});

exports.update = asyncHandler(async (req, res, next) => {
    
    const id = parseInt(req.params.id);

    const lessonModel = new Lesson(req.body);

    const updated = await client.faculty.update({
        where: {
            id: id,
        },
        data: lessonModel,
    });

    res.status(200).json({
        success: true,
        data: updated,
    });

});