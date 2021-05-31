const asyncHandler = require('../middleware/async');
const { Class } = require('../models/class/class.model');
const { client } = require('../config/prisma-config');

exports.getById = asyncHandler(async (req, res, next) => {

    const id = parseInt(req.params.id);

    const class_ = await client.classes.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            session: true,
            year: true,
            status: true,
            teacher: {
                select: {
                    id: true,
                    firsName: true,
                    lastName: true,
                    teacherField: {
                        select: {
                            qualification: true,
                        },
                    },
                },
            },
            lesson: {
                select: {
                    id: true,
                    name: true,
                    code: true,
                    grade: true,
                },
            },
        },
    });

    res.status(200).json({
        success: true,
        data: class_
    })

});

exports.getAllStudents = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    const students = await client.studentClasses.findMany({
        where: {
            classId: id,
        },
        select: {
            id: true,
            average: true,
            letterScore: true,
            result: true,
            student: {
                select: {
                    id: true,
                    firsName: true,
                    lastName: true,
                },
            },
            exams: {
                select: {
                    id: true,
                    type: true,
                    score: true,
                },
            },
        },
    });

    res.status(200).json({
        success: true,
        datas: students,
    })
});

// TODO: Pagination
// *Child of lesson
exports.getAll = asyncHandler(async (req, res, next) => {

    const lessonId = parseInt(req.params.lessonId);

    const classes = await client.classes.findMany({
        where: {
            lessonId: lessonId,
            status: req.query.status,
            year: req.query.year,
            session: req.query.session,
        },
        select: {
            id: true,
            session: true,
            year: true,
            status: true,
            teacher: {
                select: {
                    id: true,
                    firsName: true,
                    lastName: true,
                    teacherField: {
                        select: {
                            qualification: true,
                        }
                    }
                },
            },
            lesson: {
                select: {
                    id: true,
                    name: true,
                    code: true,
                },
            },
        },
    });

    res.status(200).json({
        success: true,
        datas: classes,
    });
});

// TODO: Pagination
// *Child of lesson
exports.create = asyncHandler(async (req, res, next) => {
    const lessonId = parseInt(req.params.lessonId);
    req.body.lessonId = lessonId;

    const classModel = new Class(req.body);
    classModel.fillYearAndSession();

    const created = await client.classes.create({
        data: classModel,
        select: {
            id: true,
            session: true,
            year: true,
            status: true,
            teacher: {
                select: {
                    id: true,
                    firsName: true,
                    lastName: true,
                    teacherField: {
                        select: {
                            qualification: true,
                        },
                    },
                },
            },
            lesson: {
                select: {
                    id: true,
                    name: true,
                    code: true,
                },
            },
        },
    });

    res.status(200).json({
        success: true,
        data: created,
    });
});

exports.updateById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    const classModel = new Class(req.body);

    const updated = await client.classes.update({
        where: {
            id: id,
        },
        data: classModel,
        select: {
            id: true,
            session: true,
            year: true,
            status: true,
            teacher: {
                select: {
                    id: true,
                    firsName: true,
                    lastName: true,
                    teacherField: {
                        select: {
                            qualification: true,
                        },
                    },
                },
            },
            lesson: {
                select: {
                    id: true,
                    name: true,
                    code: true,
                    grade: true,
                },
            },
        },
    });

    res.status(200).json({
        success: true,
        data: updated,
    });
});

exports.deleteById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    await client.classes.delete({
        where: {
            id: id,
        },
    });

    res.status(200).json({
        success: true,
    });
});