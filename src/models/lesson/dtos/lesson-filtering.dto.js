const ErrorResponse = require('../../../utils/ErrorResponse');
const options = require('../../dto-options');
const joi = require('joi');

function lessonFilteringDto(req, res, next) {
    const schema = {
        query: joi.object({
            grade: joi.number()
                .min(0)
                .max(6),
            credit: joi.number()
                .min(1)
                .max(11),
        }),
    }

    const { error, value } = schema.query.validate(req.query, options);

    if (error) {
        return next(new ErrorResponse(`${error.message}`, 400));
    }
    req.query = value;
    next();
}

module.exports = lessonFilteringDto;