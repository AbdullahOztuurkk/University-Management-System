const { client } = require("../config/prisma-config");
const asyncHandler = require("../middleware/async");
const { Department } = require('../models/department/department.model');
const { default: slugify } = require('slugify');

// TODO: Pagination
exports.getById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    const department = await client.departments.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            faculty: {
                select: {
                    id: true,
                    name: true,
                }
            }
        },

    });

    res.status(200).json({
        success: true,
        datas: department,
    });

});

// *Child of faculty
exports.getAll = asyncHandler(async (req, res, next) => {

    const facultyId = parseInt(req.params.facultyId);

    const departments = await client.departments.findMany({
        where: {
            facultyId: facultyId,
        },
        select: {
            id: true,
            name: true,
        },
    });

    res.status(200).json({
        success: true,
        datas: departments,
    });
});

// *Child of faculty 
exports.create = asyncHandler(async (req, res, next) => {

    const facultyId = parseInt(req.params.facultyId);
    req.body.facultyId = facultyId

    const departmentModel = new Department(req.body);

    departmentModel.slugifyName = slugify(departmentModel.name, {
        lower: true,
    });

    const created = await client.departments.create({
        data: departmentModel,
        select: {
            id: true,
            name: true,
            faculty: {
                select: {
                    id: true,
                    name: true,
                },
            }
        },
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

    const updated = await client.departments.update({
        where: {
            id: id,
        },
        data: departmentModel,
        select: {
            id: true,
            name: true,
            faculty: {
                select: {
                    id: true,
                    name: true,
                }
            }
        },
    });

    res.status(200).json({
        success: true,
        data: updated,
    });
});

exports.deleteById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    await client.departments.delete({
        where: {
            id: id,
        },
    });

    res.status(200).json({
        success: true,
    });

});
