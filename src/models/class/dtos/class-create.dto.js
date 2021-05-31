const ErrorResponse = require('../../../utils/ErrorResponse');
const options = require('../../dto-options');
const joi = require('joi');

function classCreateDto(req, res, next) {
    const schema = {
        body: joi.object({
            teacherId: joi.number()
                .min(1)
                .required(),
            status: joi.string()
                .valid('OPENED', 'CLOSED'),
        }),
    }



    const { error, value } = schema.body.validate(req.body, options);

    if (error) {
        return next(new ErrorResponse(`${error.message}`, 400))
    }
    req.body = value;
    next();
}

module.exports = classCreateDto;