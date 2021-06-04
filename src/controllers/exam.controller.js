const asyncHandler = require("../middleware/async");
const { Exam } = require('../models/exam/exam.model');
const { client } = require('../config/prisma-config');
const { User } = require('../models/user/user.model');
const ErrorResponse = require("../utils/ErrorResponse");
const { paginate } = require("../utils/pagination");


exports.create = asyncHandler(async (req, res, next) => {
    const studentClassId = parseInt(req.params.studentClassId);

    const class_ = await client.classes.findFirst({
        where: {
            studentClasses: {
                some: {
                    id: studentClassId
                },
            },
            teacherId: req.user.id,
        },
        select: {
            id: true,
        }
    })
    if (!class_) {
        return next(new ErrorResponse('Unauthorized', 401));
    }

    req.body.studentClassId = studentClassId;

    const examModel = new Exam(req.body);

    const created = await client.exams.create({
        data: examModel,
        select: {
            id: true,
            score: true,
            type: true,
            studentClass: {
                select: {
                    id: true,
                    student: {
                        select: {
                            id: true,
                            firsName: true,
                            lastName: true,
                        },
                    },
                },
            },
        },
    });

    // TODO: Rabbit mq
    Exam.calculateAverage(created.studentClassId);
    User.calculateGno(created.studentClassId);

    res.status(200).json({
        success: true,
        data: created,
    });
});


exports.getById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    const exam = await client.exams.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            type: true,
            score: true,
            studentClass: {
                select: {
                    average: true,
                    result: true,
                    letterScore: true,
                    student: {
                        select: {
                            id: true,
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
        data: exam,
    });
});


exports.getAll = asyncHandler(async (req, res, next) => {

    const classId = parseInt(req.params.classId);

    const exams = await paginate(req, res, client.exams, {
        studentClass: {
            classId: classId,
            studentId: req.query.studentId,
        },
        type: req.query.type,
    }, {
        id: true,
        score: true,
        type: true,
        studentClass: {
            select: {
                id: true,
                student: {
                    select: {
                        firsName: true,
                        lastName: true,
                    },
                },
            },
        },
    });

    res.status(200).json({
        success: true,
        datas: exams,
        pagination: res.pagination,
    });
});


exports.updateById = asyncHandler(async (req, res, next) => {

    const id = parseInt(req.params.id);

    const class_ = await client.classes.findFirst({
        where: {
            teacherId: req.user.id,
            studentClasses: {
                some: {
                    exams: {
                        some: {
                            id: id
                        },
                    },
                },
            },
        },
        select: {
            id: true,
        },
    });

    if (!class_) {
        return next(new ErrorResponse('Unauthorized', 401));
    }

    const examModel = new Exam(req.body);

    const updated = await client.exams.findUnique({
        where: {
            id: id,
        },
        data: examModel,
        select: {
            id: true,
            type: true,
            score: true,
            studentClass: {
                select: {
                    id: true,
                    average: true,
                    result: true,
                    letterScore: true,
                    student: {
                        select: {
                            id: true,
                            firsName: true,
                            lastName: true,
                        },
                    },
                },
            },
        },
    });

    // TODO: Rabbit mq
    Exam.calculateAverage(updated.studentClass.id);
    User.calculateGno(updated.studentClass.id);

    res.status(200).json({
        success: true,
        data: updated,
    });
});


exports.deleteById = asyncHandler(async (req, res, next) => {

    const id = parseInt(req.params.id);

    const exam = await client.exams.findFirst({
        where: {
            id: id,
            studentClass: {
                class: {
                    teacherId: req.user.id
                },
            },
        },
    });

    if (!exam) {
        return next(new ErrorResponse('Unauthorized', 401));
    }

    const deleted = await client.exams.delete({
        where: {
            id: id,
        }
    });

    // TODO: Rabbit mq
    Exam.calculateAverage(deleted.studentClassId);
    User.calculateGno(deleted.studentClassId);

    res.status(200).json({
        success: true,
    });
});