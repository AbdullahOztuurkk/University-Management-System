const { client } = require("../config/prisma-config");
const asyncHandler = require("../middleware/async");
const { Exam } = require('../models/Exam/exam.model');

exports.getById = asyncHandler(async (req, res, next) => {
    
    const userId = parseInt(req.user.id);
    const userlessonId = parseInt(req.params.id);

    const exam = await client.Exam.findUnique({
        select: {
            type:true,
            score:true,
            announcementDate:true,
            userLesson:{
                user:{
                    firstName:true,
                    lastName:true,
                    id:true,
                },
                lesson:{
                    name:true,
                    code:true,
                    credit:true
                },
                where:{
                    id:userId,
                }
            },
        },
        where: {
            id: userlessonId,
        },

    });

    res.status(200).json({
        success: true,
        data: exam,
    });

});

exports.getAll = asyncHandler(async (req, res, next) => {

    const userId = parseInt(req.user.id);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const exams = await client.exam.findMany({
        select: {
            type:true,
            score:true,
            announcementDate:true,
            UserLesson:{
                select:{
                    user:{
                        select:{
                            firstName:true,
                            lastName:true,
                            id:true,
                        },
                    },
                    lesson:{
                        select:{
                            name:true,
                            code:true,
                            credit:true
                        }
                    }
                },
            },
        },
        where:{
            id:userId,
        },
        skip: skip,
        take: limit,
    });

    // TODO: pagination headers

    res.status(200).json({
        success: true,
        data: exams,
    });
});

exports.create = asyncHandler(async (req, res, next) => {
    //Code Here
});

exports.updateById = asyncHandler(async (req, res, next) => {
   
    const examId = parseInt(req.params.id);
    const examModel = new Exam(req.body);

    const updated = await client.Exam.update({
        where: {
            id: examId,
        },
        data: examModel,
    });

    res.status(200).json({
        success: true,
        data: updated,
    });
    
});

exports.deleteById = asyncHandler(async (req, res, next) => {
    
    const examId = parseInt(req.params.id);

    const deleted = await client.Exam.delete({
        where: {
            id: examId,
        },
    });

    res.status(200).json({
        success: true,
        message: `${deleted.name} başarıyla silindi.`,
    })

});
