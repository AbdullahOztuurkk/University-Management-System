const { client } = require("../config/prisma-config");
const asyncHandler = require("../middleware/async");
const { Department } = require('../models/department/department.model');
const { default: slugify } = require('slugify');

exports.getById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    const department = await client.department.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            slugifyName: true,
            lessons: {
                select: {
                    id: true,
                    name: true,
                    grade: true,
                    code: true,
                },
            }
        },

    });

    res.status(200).json({
        success: true,
        datas: department,
        // Departments counts here...
        // Number of users of departments here...
    });

});

exports.getAll = asyncHandler(async (req, res, next) => {
    const departments = await client.department.findMany({
        select: {
            id: true,
            name: true,
            slugifyName: true,
        },
    });


    res.status(200).json({
        success: true,
        datas: departments,
        // Lessons counts here...
    });
});

exports.create = asyncHandler(async (req, res, next) => {

    const departmentModel = new Department(req.body);
    departmentModel.slugifyName = slugify(departmentModel.name, {
        lower: true,
    });

    console.log(departmentModel);
    console.log(typeof departmentModel);

    const created = await client.department.create({
        data: departmentModel,
    });

    res.status(200).json({
        success: true,
        data: created,
    });

});

exports.updateById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    const departmentModel = new Department(req.body);
    if (departmentModel.name) {
        departmentModel.slugifyName = slugify(departmentModel.name, {
            lower: true
        });
    }
    console.log();

    const updated = await client.department.update({
        where: {
            id: id,
        },
        data: departmentModel,
    });

    res.status(200).json({
        success: true,
        data: updated,
    });
});

exports.deleteById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    const deleted = await client.department.delete({
        where: {
            id: id,
        },
    });

    res.status(200).json({
        success: true,
        message: `${deleted.name} başarıyla silindi.`,
    })

});
