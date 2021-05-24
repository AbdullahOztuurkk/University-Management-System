const joi = require('joi');
const ErrorResponse = require('../../../utils/ErrorResponse');
const options = require('../../dto-options');

function userCreateDto(req, res, next) {

    const schema = {
        body: joi.object({
            firstName: joi.string()
                .required(),
            lastName: joi.string()
                .required(),
            role: joi.string()
                .valid('ADMIN', 'TEACHER', 'STUDENT')
                .required(),
            departmentId: joi.number(),
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