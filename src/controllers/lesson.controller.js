const { client } = require('../config/prisma-config');
const asyncHandler = require('../middleware/async');
const { Lesson } = require('../models/lesson/lesson.model');
const { default: slugify } = require('slugify');
const { paginate } = require('../utils/pagination');

exports.getById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const lesson = await client.lessons.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            code: true,
            credit: true,
            grade: true,
            department: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },

    });

    res.status(200).json({
        success: true,
        data: lesson,
    });

});


// *Child of department
exports.getAll = asyncHandler(async (req, res, next) => {

    const departmentId = parseInt(req.params.departmentId);

    const lessons = await paginate(req, res, client.lessons, {
        departmentId: departmentId,
        grade: req.query.grade,
        credit: req.query.credit,
    }, {
        id: true,
        name: true,
        code: true,
        slugifyName: true,
    });

    res.status(200).json({
        success: true,
        data: lessons,
        pagination: res.pagination,
    });

});

// BUG: Unique constraint of slugifyName , departmentId is not working as expected. Expected behavior is client can be added lessons that have similar names
// *Child of department
exports.create = asyncHandler(async (req, res, next) => {

    const departmentId = parseInt(req.params.departmentId);

    req.body.departmentId = departmentId

    const lessonModel = new Lesson(req.body);
    lessonModel.slugifyName = slugify(lessonModel.name, {
        lower: true,
    });

    const created = await client.lessons.create({
        data: lessonModel,
        select: {
            id: true,
            name: true,
            code: true,
            credit: true,
            grade: true,
            department: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    });

    res.status(200).json({
        success: true,
        data: created,
    });

});

exports.deleteById = asyncHandler(async (req, res, next) => {

    const id = parseInt(req.params.id);

    await client.lessons.delete({
        where: {
            id: id,
        },
    });

    res.status(200).json({
        success: true,
    });
});

exports.updateById = asyncHandler(async (req, res, next) => {

    const id = parseInt(req.params.id);

    const lessonModel = new Lesson(req.body);
    if (lessonModel.name) {
        lessonModel.slugifyName = slugify(lessonModel.name, {
            lower: true,
        });
    }

    const updated = await client.lessons.update({
        where: {
            id: id,
        },
        data: lessonModel,
        select: {
            id: true,
            name: true,
            code: true,
            credit: true,
            grade: true,
            department: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    res.status(200).json({
        success: true,
        data: updated,
    });
});

