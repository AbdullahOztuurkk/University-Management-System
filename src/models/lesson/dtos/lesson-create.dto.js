const joi = require('joi');
const ErrorResponse = require('../../../utils/ErrorResponse');
const options = require('../../dto-options');

function lessonCreateDto(req, res, next) {

    const schema = {
        body: joi.object({
            name: joi.string()
                .min(4)
                .max(50)
                .required(),
            credit: joi.number()
                .min(1)
                .max(11)
                .required(),
            code: joi.string()
                .min(5)
                .max(5)
                .required(),
            grade: joi.number()
                .min(1)
                .max(6)
                .required(),
        }),
    }

    const { error, value } = schema.body.validate(req.body, options);

    if (error) {
        return next(new ErrorResponse(`${error.message}`, 400));
    }
    req.body = value;
    next();

}

module.exports = lessonCreateDto;
