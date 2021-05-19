const { client } = require('../config/prisma-config');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { User } = require('../models/user/user.model');
const constants = require('../constants/constants');
const sendEmail = require('../utils/sendMail');


exports.login = asyncHandler(async (req, res, next) => {

    const { email, pwd } = req.body;

    if (!email || !pwd) {
        return next(new ErrorResponse('Email ve şifre boş bırakılamaz.', 400));
    }

    const user = await client.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
            email: true,
            pwdHash: true,
            pwdSalt: true,
        }
    });

    if (!user) {
        return next(new ErrorResponse('Email yada şifre hatalı.', 400));
    }

    const userModel = new User(user);
    console.log(userModel.id);

    if (!await userModel.matchPassword(pwd)) {
        return next(new ErrorResponse('Email yada şifre hatalı.', 400));
    }

    sendTokenResponse(userModel, 200, res);
});

exports.me = asyncHandler(async (req, res, next) => {
    const user = await client.user.findUnique({
        where: {
            id: req.user.id,
        },
        select: {
            id: true,
            email: true,
            status: true,
            role: true,
            firstName: true,
            lastName: true,
        }
    });

    if (!user) {
        return next(new ErrorResponse('Kullanıcı bulunamadı', 404));
    }

    res.status(200).json({
        success: true,
        data: user,
    })
});

exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({ success: true });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await client.user.findFirst({
        where: {
            email: req.email
        },
        select: {
            id: true,
            email: true,
            role: true,
        }
    });

    if (!user) {
        return next(new ErrorResponse('Emailin sisteme kayıtlı olması durumunda şifre yenileme linki gönderilmiştir', 200));
    }

    const userModel = new User(user);

    const token = userModel.getSignedJwt();

    const resetUrl = `${req.protocol}://${req.get('host')}/auth/resetpassword/${token}`;

    const message = `Şifrenizi resetleme ekranına erişmek için lüften bağlantıya tıklayınız URL = ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Şifremi Unuttum',
            message,
        });

        res.status(200).json({ success: true });

    } catch (error) {
        return next(new ErrorResponse('Şifre doğrulama bağlantısı gönderilemedi', 500));
    }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
    const user = await client.user.findUnique({
        where: {
            id: req.user.id,
        },
        select: {
            id: true,
            email: true,
        }
    });

    const userModel = new User(user);

    userModel.pwd = req.body.pwd;

    await userModel.hashPassword();

    await client.user.update({
        where: {
            email: user.email,
        },
        data: {
            pwdHash: userModel.pwdHash,
            pwdSalt: userModel.pwdSalt,
        },
    });

    res.status(200).json({ succes: true });
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