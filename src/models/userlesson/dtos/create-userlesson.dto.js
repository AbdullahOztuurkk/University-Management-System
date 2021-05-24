const joi = require('joi');
const ErrorResponse = require('../../../utils/ErrorResponse');
const options = require('../../dto-options');

function UserLessonCreateDto(req, res, next) {
    const schema = {
        body: joi.object({
            userId: joi.number()
                .required()
        }),
    }

    const { error, value } = schema.body.validate(req.body, options);

    if (error) {
        next(new ErrorResponse(`${error.message}`, 400))
    }
    req.body = value;
    next();
}

module.exports = UserLessonCreateDto;