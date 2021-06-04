const joi = require('joi');
const ErrorResponse = require('../../../utils/ErrorResponse');
const options = require('../../dto-options');

function examFilteringDto(req, res, next) {
    const schema = {
        query: joi.object({
            type: joi.string()
                .valid('MIDTERM', 'FINAL', 'MAKEUP'),
            studentId: joi.number()
                .min(1),
        }),
    }

    const { error, value } = schema.query.validate(req.query, options);

    if (error) {
        return next(new ErrorResponse(`${error.message}`, 400));
    }
    req.query = value;
    next();
}

module.exports = examFilteringDto;