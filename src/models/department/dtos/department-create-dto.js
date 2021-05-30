const ErrorResponse = require('../../../utils/ErrorResponse');
const options = require('../../dto-options');
const joi = require('joi');

function departmentCreateDto(req, res, next) {
    const schema = {
        body: joi.object({
            name: joi.string()
                .min(4)
                .max(50)
                .required(),
        }),
    }

    const { error, value } = schema.body.validate(req.body, options);

    if (error) {
        return next(new ErrorResponse(`${error.message}`, 400))
    }
    req.body = value;
    next();
}

module.exports = departmentCreateDto;