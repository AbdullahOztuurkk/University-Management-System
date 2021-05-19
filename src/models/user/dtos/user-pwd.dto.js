const joi = require('joi');
const ErrorResponse = require('../../../utils/ErrorResponse');
const options = require('../../dto-options');

function userPwdDto(req, res, next) {

    const schema = {
        body: joi.object({
            pwd: joi.string()
                .min(4)
                .max(16)
                .required()
        }),
    }

    const { error, value } = schema.body.validate(req.body, options);

    if (error) {
        next(new ErrorResponse(`${error.message}`, 400));
    }
    req.body = value;
    next();

}

module.exports = userPwdDto;
