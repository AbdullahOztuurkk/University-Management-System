const asyncHandler = require("../middleware/async");
const { User } = require('../models/user/user.model');
const { client } = require('../config/prisma-config');


// *Child of department 
exports.create = asyncHandler(async (req, res, next) => {
    const departmentId = parseInt(req.params.departmentId);

    req.body.teacherDepartments = {
        departmentId: departmentId,
    }

    const teacherModel = new User(req.body);
    teacherModel.hashPassword();

    const teacher = await client.users.create({
        data: {
            firstName: teacherModel.firstName,
            lastName: teacherModel.lastName,
            email: teacherModel.email,
            pwdHash: teacherModel.pwdHash,
            pwdSalt: teacherModel.pwdSalt,
            role: teacherModel.role,
            teacherDepartments: {
                create: teacherModel.teacherDepartments,
            },
            teacherField: {
                create: teacherModel.teacherField,
            },
        },
    });

    res.status(200).json({
        success: true,
        data: teacher,
    });
});