const asyncHandler = require("../middleware/async");
const { User } = require('../models/user/user.model');
const { client } = require('../config/prisma-config');


// *Child of department 
exports.create = asyncHandler(async (req, res, next) => {
    const departmentId = parseInt(req.params.departmentId);

    req.body.studentDepartments = {
        departmentId: departmentId,
        type: 'MAJOR',
    }

    if (!req.body.studentField) {
        req.body.studentField = {}
    }

    const studentModel = new User(req.body);
    studentModel.hashPassword();

    const student = await client.users.create({
        data: {
            firstName: studentModel.firstName,
            lastName: studentModel.lastName,
            email: studentModel.email,
            pwdHash: studentModel.pwdHash,
            pwdSalt: studentModel.pwdSalt,
            role: studentModel.role,
            studentDepartments: {
                create: studentModel.studentDepartments,
            },
            studentField: {
                create: studentModel.studentField,
            },
        },
    });

    res.status(200).json({
        success: true,
        data: student,
    });
});

exports.getById = asyncHandler(async (req, res, next) => {

});

