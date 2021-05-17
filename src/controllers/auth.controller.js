const { client } = require('../config/prisma-config');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { User } = require('../models/user/user.model');
const constants = require('../constants/constants');

exports.login = asyncHandler(async (req, res, next) => {
    // Code here... 
});

exports.me = asyncHandler(async (req, res, next) => {
    // Code here...
});

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwt();

    const cookieOptions = {
        expires: new Date(Date.now() + constants.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }
    if (constants.NODE_ENV === 'production') {
        cookieOptions.secure = true;
    }
    res
        .status(statusCode)
        .cookie('token', token, cookieOptions)
        .json({ success: true });
}