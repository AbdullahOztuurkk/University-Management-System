const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("./async");
const { client } = require('../config/prisma-config');
const constants = require('../constants/constants');
const jwt = require('jsonwebtoken');

exports.jwtAuthentication = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token || token === 'none') {
        return next(new ErrorResponse('Lütfen giriş yapınız.', 401));
    }

    try {
        const decoded = jwt.verify(token, constants.JWT_SECRET);

        const user = await client.users.findUnique({
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                role: true,
            }
        });

        req.user = user;

        next();


    } catch (error) {
        return next(new ErrorResponse('Oturum hatası.', 500));
    }
});

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse('Bu işlem için yetkiniz bulunmamaktadır.', 401))
        }
        next();
    }
}