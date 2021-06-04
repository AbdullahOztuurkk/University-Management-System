const ErrorResponse = require('../../../../utils/ErrorResponse');
const options = require('../../../dto-options');
const joi = require('joi');

function teacherFilteringDto(req, res, next) {
    const schema = {
        query: joi.object({
            qualification: joi.string()
                .valid('PROF', 'DOCENT', 'LECTURER', 'ASSISTANT'),
        }),
    }

    const { error, value } = schema.query.validate(req.query, options);

    if (error) {
        return next(new ErrorResponse(`${error.message}`, 400));
    }
    req.query = value;
    next();
}

module.exports = teacherFilteringDto;