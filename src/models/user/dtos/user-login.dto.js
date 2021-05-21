const joi = require('joi');
const ErrorResponse = require('../../../utils/ErrorResponse');
const options = require('../../dto-options');

function userLoginDto(req, res, next) {

    const schema = {
        body: joi.object({
            email: joi.string()
                .email()
                .required(),
            pwd: joi.string()
                .min(4)
                .max(16)
                .required()
        }),
    }

    const { error, value } = schema.body.validate(req.body, options);

    if (error) {
        return next(new ErrorResponse(`${error.message}`, 400));
    }
    req.body = value;
    next();

}

module.exports = userLoginDto;
