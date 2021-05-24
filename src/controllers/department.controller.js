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

// Child of faculty
exports.getAll = asyncHandler(async (req, res, next) => {

    const facultyId = parseInt(req.params.facultyId);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const departments = await client.department.findMany({
        where: {
            facultyId: facultyId,
        },
        select: {
            id: true,
            name: true,
            slugifyName: true,
        },
        skip: skip,
        take: limit,
        // TODO: total data count 
    });

    // TODO: pagination headers

    res.status(200).json({
        success: true,
        datas: departments,
    });
});

// Child of faculty 
exports.create = asyncHandler(async (req, res, next) => {

    console.log(req.body);
    const departmentModel = new Department(req.body);
    console.log(departmentModel.name);
    departmentModel.facultyId = parseInt(req.params.facultyId);
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
