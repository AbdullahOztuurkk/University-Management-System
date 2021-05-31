const ErrorResponse = require('../../../utils/ErrorResponse');
const options = require('../../dto-options');
const joi = require('joi');

function classFilteringDto(req, res, next) {
    const schema = {
        query: joi.object({
            status: joi.string()
                .valid('OPENED', 'CLOSED'),
            session: joi.string()
                .valid('AUTUMN', 'SPRING', 'SUMMER'),
            year: joi.string()
                .min(9)
                .max(9),
        }),
    }

    const { error, value } = schema.query.validate(req.query, options);

    if (error) {
        return next(new ErrorResponse(`${error.message}`, 400));
    }
    req.body = value;
    next();
}

module.exports = classFilteringDto;