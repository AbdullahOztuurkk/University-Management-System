const { client } = require('../config/prisma-config');
const asyncHandler = require('../middleware/async');
const { Lesson } = require('../models/lesson/lesson.model');

exports.getById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    const lesson = await client.lesson.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            code: true,
            credit: true,
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
// Child of department
exports.getAll = asyncHandler(async (req, res, next) => {

    const departmentId = parseInt(req.params.departmentId);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const lessons = await client.lesson.findMany({
        where: {
            departmentId: departmentId,
        },
        select: {
            id: true,
            name: true,
            code: true,
            credit: true,
        },
        skip: skip,
        take: limit,
        // TODO: total data count
    });

    // TODO: pagination headers

    res.status(200).json({
        success: true,
        data: lessons,
    });

});

// Child of department
exports.create = asyncHandler(async (req, res, next) => {

    const departmentId = parseInt(req.params.departmentId);

    const lessonModel = new Lesson(req.body);
    lessonModel.departmentId = departmentId;

    const created = await client.lesson.create({
        data: lessonModel,
    });

    res.status(200).json({
        success: true,
        data: created,
    });

});

exports.deleteById = asyncHandler(async (req, res, next) => {

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

exports.updateById = asyncHandler(async (req, res, next) => {

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

exports.open = asyncHandler(async (req, res, next) => {
    // Creates userlesson and assing a teacher
});