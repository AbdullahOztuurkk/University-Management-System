const { client } = require("../config/prisma-config");
const asyncHandler = require("../middleware/async");
const { User } = require("../models/user/user.model");

exports.create = asyncHandler(async (req, res, next) => {

});

exports.getById = asyncHandler(async (req, res, next) => {

});

exports.getAll = asyncHandler(async (req, res, next) => {
    // By department
});

exports.update = asyncHandler(async (req, res, next) => {

});

exports.delete = asyncHandler(async (req, res, next) => {

});

exports.getJoinedSesionLessons = asyncHandler(async (req, res, next) => {

});

exports.getJoinedLessons = asyncHandler(async (req, res, next) => {

});

exports.joinOpenedLesson = asyncHandler(async (req, res, next) => {

});

exports.leaveOpenedLesson = asyncHandler(async (req, res, next) => {

});