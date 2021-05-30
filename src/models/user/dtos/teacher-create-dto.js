const joi = require('joi');
const ErrorResponse = require('../../../utils/ErrorResponse');
const options = require('../../dto-options');

function teacherCreateDto(req, res, next) {

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
            teacherField: joi.object({
                qualification: joi.string()
                    .valid('PROF', 'DOCENT', 'LECTURER', 'ASSISTANT')
                    .required(),
                website: joi.string()
                    .max(100)
                    .required()
            }),
        }),
    }

    const { error, value } = schema.body.validate(req.body, options);

    if (error) {
        next(new ErrorResponse(`${error.message}`, 400));
    }
    req.body = value;
    next();

}

module.exports = teacherCreateDto;