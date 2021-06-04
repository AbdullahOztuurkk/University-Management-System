const joi = require('joi');
const ErrorResponse = require('../../../../utils/ErrorResponse');
const options = require('../../../dto-options');

function userCreateDto(req, res, next) {

    const schema = {
        body: joi.object({
            firstName: joi.string()
                .min(2)
                .max(50)
                .required(),
            lastName: joi.string()
                .min(2)
                .max(50)
                .required(),
            pwd: joi.string()
                .min(8)
                .max(32),
            email: joi.string()
                .email()
                .required(),
        }),
    }

    const { error, value } = schema.body.validate(req.body, options);

    if (error) {
        next(new ErrorResponse(`${error.message}`, 400));
    }
    req.body = value;
    next();

}

module.exports = userCreateDto;