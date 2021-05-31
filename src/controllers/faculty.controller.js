const { client } = require('../config/prisma-config');
const { Faculty } = require('../models/faculty/faculty.model');
const asyncHandler = require('../middleware/async');
const { default: slugify } = require("slugify");

// TODO: Pagination 
exports.getById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    const faculty = await client.faculties.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
        },
    });

    res.status(200).json({
        success: true,
        datas: faculty,
    });

});

exports.getAll = asyncHandler(async (req, res, next) => {

    const faculty = await client.faculties.findMany({
        select: {
            id: true,
            name: true,
        },
    });

    res.status(200).json({
        success: true,
        datas: faculty,
    });
});

exports.create = asyncHandler(async (req, res, next) => {

    const facultyModel = new Faculty(req.body);
    facultyModel.slugifyName = slugify(facultyModel.name, {
        lower: true,
    });

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

    const updated = await client.faculties.update({
        where: {
            id: id,
        },
        data: facultyModel,
        select: {
            id: true,
            name: true,
        },
    });

    res.status(200).json({
        success: true,
        data: updated,
    });
});

exports.deleteById = asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    await client.faculties.delete({
        where: {
            id: id,
        },
    });

    res.status(200).json({
        success: true,
    });
});
