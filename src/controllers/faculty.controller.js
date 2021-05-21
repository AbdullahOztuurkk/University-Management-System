const ErrorResponse = require("../utils/ErrorResponse");
const { client } = require('../config/prisma-config');
const { Faculty } = require('../models/faculty/faculty.model');
const asyncHandler = require('../middleware/async');
const { default: slugify } = require("slugify");

exports.getById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    const faculty = await client.faculty.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            slugifyName: true,
            departments: {
                select: {
                    id: true,
                    name: true,
                    slugifyName: true,
                },
            },
        },

    });

    res.status(200).json({
        success: true,
        datas: faculty,
        // Departments counts here...
    });

});

exports.getAll = asyncHandler(async (req, res, next) => {
    const faculty = await client.faculty.findMany({
        select: {
            id: true,
            name: true,
            slugifyName: true,
            departments: {
                select: {
                    id: true,
                    name: true,
                    slugifyName: true,
                },
            },
        },
    });


    res.status(200).json({
        success: true,
        datas: faculty,
        // Faculties counts here...
    });
});

exports.create = asyncHandler(async (req, res, next) => {

    const facultyModel = new Faculty(req.body);
    facultyModel.slugifyName = slugify(facultyModel.name, {
        lower: true,
    });

    console.log(facultyModel);
    console.log(typeof facultyModel);

    const created = await client.faculty.create({
        data: facultyModel,
    });

    res.status(200).json({
        success: true,
        data: created,
    });

});

exports.updateById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    const facultyModel = new Faculty(req.body);
    if (facultyModel.name) {
        facultyModel.slugifyName = slugify(facultyModel.name, {
            lower: true
        });
    }
    console.log();

    const updated = await client.faculty.update({
        where: {
            id: id,
        },
        data: facultyModel,
    });

    res.status(200).json({
        success: true,
        data: updated,
    });
});

exports.deleteById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    const deleted = await client.faculty.delete({
        where: {
            id: id,
        },
    });

    res.status(200).json({
        success: true,
        message: `${deleted.name} başarıyla silindi.`,
    })

});
