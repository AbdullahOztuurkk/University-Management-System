const { client } = require('../config/prisma-config');
const asyncHandler = require('../middleware/async');
const { Lesson } = require('../models/lesson/lesson.model');
const ErrorResponse = require('../utils/ErrorResponse');

exports.getById = asyncHandler(async (req, res, next) => {
    // Code here.
});

exports.getAll = asyncHandler(async (req, res, next) => {
    // Code here.
});

exports.create = asyncHandler(async (req, res, next) => {
    // Code here.
});

exports.delete = asyncHandler(async (req, res, next) => {
    // Code here.
});

exports.update = asyncHandler(async (req, res, next) => {
    // Code here.
});