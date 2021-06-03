const joi = require('joi');
const ErrorResponse = require('../../../utils/ErrorResponse');
const options = require('../../dto-options');

function studentCreateDto(req, res, next) {

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
            studentField: joi.object({
                status: joi.string()
                    .valid('ACTIVE', 'INACTIVE', 'GRADUATED', 'LEFT'),
                grade: joi.number()
                    .min(0)
                    .max(6),
            })
        }),
    }

    const { error, value } = schema.body.validate(req.body, options);

    if (error) {
        next(new ErrorResponse(`${error.message}`, 400));
    }
    req.body = value;
    req.body.role = 'STUDENT';
    next();

}

module.exports = studentCreateDto;