const { client } = require('../config/prisma-config');
const asyncHandler = require('../middleware/async');
const { Lesson } = require('../models/lesson/lesson.model');
const { Class } = require('../models/class/class.model');

// TODO: Pagination
exports.getById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    // ?Is there another way better instead of taking instance of class
    const classModel = new Class();
    class_.fillYearAndSession();

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
            classes: {
                where: {
                    session: classModel.session,
                    year: classModel.year,
                },
                select: {
                    // !This line of query may cause a kind of error
                    _count: {
                        select: {
                            id: true,
                        }
                    },
                    id: true,
                    year: true,
                    session: true,
                    status: true,
                    teacher: {
                        select: {
                            firsName: true,
                            lastName: true,
                        },
                    },
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

    // ?Is there...
    const classModel = new Class();
    classModel.fillYearAndSession();

    const lessons = await client.lessons.findMany({
        where: {
            departmentId: departmentId,
        },
        select: {
            id: true,
            name: true,
            code: true,
            credit: true,
            grade: true,
            classes: {
                where: {
                    session: classModel.session,
                    year: classModel.year,
                },
                select: {
                    // !This line of query may cause a kind of error
                    _count: {
                        select: {
                            id: true
                        }
                    }
                },
            },
        },
    });

    res.status(200).json({
        success: true,
        data: lessons,
    });

});

// *Child of department
exports.create = asyncHandler(async (req, res, next) => {

    const departmentId = parseInt(req.params.departmentId);

    req.body.departmentId = departmentId

    const lessonModel = new Lesson(req.body);

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

    const classModel = new Class();
    classModel.fillYearAndSession();

    const lessonModel = new Lesson(req.body);

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
            classes: {
                where: {
                    session: classModel.session,
                    year: classModel.year,
                },
                select: {
                    // !This line of query may cause a kind of error
                    _count: {
                        select: {
                            id: true,
                        }
                    },
                    id: true,
                    year: true,
                    session: true,
                    status: true,
                    teacher: {
                        select: {
                            firsName: true,
                            lastName: true,
                        },
                    },
                },
            },
        },
    });

    res.status(200).json({
        success: true,
        data: updated,
    });
});

