const { client } = require('../config/prisma-config');
const asyncHandler = require('../middleware/async');
const { Lesson } = require('../models/lesson/lesson.model');
const ErrorResponse = require('../utils/ErrorResponse');

exports.getLessons = asyncHandler(async (req, res, next) => {
    // Code here.
});

exports.getLesson = asyncHandler(async (req, res, next) => {
    // Code here.
});

exports.DeleteLesson = asyncHandler(async (req, res, next) => {
    // Code here.
});

exports.UpdateLesson = asyncHandler(async (req, res, next) => {
    // Code here.
});

exports.CreateLesson = asyncHandler(async (req, res, next) => {
    // Code here.
});