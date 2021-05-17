const { client } = require('../config/prisma-config');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { User } = require('../models/user/user.model');
const constants = require('../constants/constants');
const { fromClassToJson, fromJsonToClass } = require('../utils/mapper');


exports.login = asyncHandler(async (req, res, next) => {

    const { email, pwd } = req.body;

    if (!email || !pwd) {
        return next(new ErrorResponse('Email ve şifre boş bırakılamaz.', 400));
    }

    console.log('1.Aşamayı Geçti');

    const user = await client.user.findUnique({
        where: {
            email: email,
        }
    });

    console.log('2.Aşamayı Geçti');

    if (!user) {
        return next(new ErrorResponse('Email yada şifre hatalı.', 400));
    }

    console.log('3.Aşamayı Geçti');

    const userJson = fromClassToJson(user);

    console.log(`4.Aşamayı Geçti ${userJson.id}`);


    const userModel = fromJsonToClass(userJson, User);

    console.log(`5. Aşamayı geçti ${userModel.id}`);

    if (!await userModel.matchPassword(pwd)) {
        return next(new ErrorResponse('Email yada şifre hatalı.', 400));
    }

    sendTokenResponse(userModel, 200, res);
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