const { client } = require('../config/prisma-config');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { User } = require('../models/user/user.model');
const constants = require('../constants/constants');
const { dbModelToClassModel } = require('../utils/mapper');


exports.login = asyncHandler(async (req, res, next) => {

    const { email, pwd } = req.body;

    if (!email || !pwd) {
        return next(new ErrorResponse('Email ve şifre boş bırakılamaz.', 400));
    }

    const user = await client.user.findUnique({
        where: {
            email: email,
        }
    });

    if (!user) {
        return next(new ErrorResponse('Email yada şifre hatalı.', 400));
    }

    const userModel = dbModelToClassModel(user, User);

    if (!await userModel.matchPassword(pwd)) {
        return next(new ErrorResponse('Email yada şifre hatalı.', 400));
    }

    sendTokenResponse(userModel, 200, res);
});

exports.me = asyncHandler(async (req, res, next) => {

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