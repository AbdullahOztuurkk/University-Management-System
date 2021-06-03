const { client } = require("../config/prisma-config");
const asyncHandler = require("../middleware/async");
const { User } = require("../models/user/user.model");
const UserLessonCreateDto = require("../models/userlesson/dtos/create-userlesson.dto");
const ErrorResponse = require("../utils/ErrorResponse");

exports.create = asyncHandler(async (req, res, next) => {
    const userModel = new User(req.body);
    userModel.assignInformations();
    userModel.hashPassword();
    const created = await client.user.create({
        data: userModel,
    });
    if (userModel.departmentId && !userModel.role === 'ADMIN') {
        await client.userDepartment.create({
            data: {
                userId: created.id,
                departmentId: userModel.departmentId,
            }
        });
    }

    res.status(200).json({
        success: true,
    })
});

exports.getById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    const user = await client.user.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            firstName:true,
            lastName:true,
            status:true,
            email:true
        }
    });

    res.status(200).json({
        data: user,
        success: true,
    });
});

exports.getAll = asyncHandler(async (req, res, next) => {
    const departmentId = parseInt(req.params.departmentId);

    const users = await client.department.findMany({
        where: {
            id: departmentId,
        },
        select: {
            id: true,
            name: true,
            userDepartments: {
                select: {
                    user: {
                        select: {
                            id: true,
                            firstName:true,
                            lastName:true,
                            status:true,
                            email:true
                        }
                    }
                }
            }
        }
    });

    res.status(200).json({
        data: users,
        success: true,
    })
});


exports.getStudents = asyncHandler(async (req, res, next) => {

    const users = await client.department.findMany({
        select: {
            id: true,
            name: true,
            userDepartments: {
                select: {
                    user: {
                        where:{
                            role: 'STUDENT'
                        },
                        select: {
                            id: true,
                            firstName:true,
                            lastName:true,
                            status:true,
                            email:true
                        }
                    }
                }
            }
        }
    });

    res.status(200).json({
        data: users,
        success: true,
    })
});

exports.getTeachers = asyncHandler(async (req, res, next) => {
    
    const users = await client.department.findMany({
        select: {
            id: true,
            name: true,
            userDepartments: {
                select: {
                    user: {
                        where:{
                            role: 'TEACHER'
                        },
                        select: {
                            id: true,
                            firstName:true,
                            lastName:true,
                            status:true,
                            email:true
                        }
                    }
                }
            }
        }
    });

    res.status(200).json({
        data: users,
        success: true,
    })
});

exports.updateById = asyncHandler(async (req, res, next) => {

    const id = parseInt(req.params.id);

    const userModel = new User(req.body);

    const updated = await client.user.update({
        where: {
            id: id,
        },
        data: userModel,
    });

    res.status(200).json({
        success: true,
        data: updated,
    });

});

exports.deleteById = asyncHandler(async (req, res, next) => {

    const id = parseInt(req.params.id);

    const deleted = await client.user.delete({
        where: {
            id: id,
        },
    });

    res.status(200).json({
        success: true,
        message: `${deleted.name} başarıyla silindi.`,
    })

});

exports.getJoinedLessons = asyncHandler(async (req, res, next) => {

    const userId = req.user.id;

	const lessons = await client.userLesson.findMany({
		where: {
            userId: userId,
        },
        select: {
			season: true,
			average: true,
			lesson: {
				select: {
					code: true,
					credit: true,
					name: true,
					status: true,
				},
			},
            userId:true
        },
        
	});

	res.status(200).json({
		success: true,
		data: lessons,
	});

});

exports.joinOpenedLesson = asyncHandler(async (req, res, next) => {

    const lessonId = req.body.id;
    const userId = req.user.id;

    const lesson = await client.userLesson.findUnique({
		select: {
			lesson: {
				select: {
					code: true,
					credit: true,
					name: true,
					status: true,
                    id:true
				},
				where: {
                    id:lessonId,
				},
			},
		},
	});

    if(lesson.status != 'OPEN'){
        return next(new ErrorResponse('Açık olmayan bir derse giremezsiniz.',400));
    }
    
    const userLesson=new UserLessonCreateDto(req.body);
    userLesson.userId=userId;

	res.status(200).json({
		success: true,
		data: lesson,
	});

});

exports.leaveOpenedLesson = asyncHandler(async (req, res, next) => {

    const userLessonId=req.body.id;

    const lesson = await client.userLesson.findUnique({
		select: {
            id:true,
			where:{
                id:userLessonId
            }
		},
	});
    
    if(lesson.status != 'OPEN'){
        return next(new ErrorResponse('Açık olmayan bir dersten çıkamazsınız.',400));
    }

    const userLesson=new UserLessonCreateDto(req.body);
    userLesson.userId=userId;

	res.status(200).json({
		success: true,
		data: lesson,
	});

});