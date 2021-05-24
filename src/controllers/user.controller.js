const { client } = require("../config/prisma-config");
const asyncHandler = require("../middleware/async");
const { User } = require("../models/user/user.model");

exports.create = asyncHandler(async (req, res, next) => {
    const userModel = new User(req.body);
    userModel.assignInformaations();
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

exports.update = asyncHandler(async (req, res, next) => {

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

exports.delete = asyncHandler(async (req, res, next) => {

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
    
});

exports.joinOpenedLesson = asyncHandler(async (req, res, next) => {

});

exports.leaveOpenedLesson = asyncHandler(async (req, res, next) => {

});