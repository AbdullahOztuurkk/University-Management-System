const ErrorResponse = require('../../../utils/ErrorResponse');
const options = require('../../dto-options');
const joi = require('joi');

function examUpdateDto(req, res, next) {
    const schema = {
        body: joi.object({
            score: joi.number()
                .min(0)
                .max(100)
                .required(),
        }),
    }

    const { error, value } = schema.body.validate(req.body, options);

    if (error) {
        return next(new ErrorResponse(`${error.message}`, 400))
    }
    req.body = value;
    next();
}

module.exports = classUpdateDto;