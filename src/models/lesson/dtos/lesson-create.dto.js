const joi = require('joi');
const ErrorResponse = require('../../../utils/ErrorResponse');
const options = require('../../dto-options');

function lessonCreateDto(req, res, next) {

    const schema = {
        body: joi.object({
            name:joi.string()
                .min(4)
                .required(),
            credit:joi.number()
                .max(10)
                .required(),
            status: joi.string()
                .required(),
            departmentId: joi.number()
                .required(),
            
        }),
    }

    const { error, value } = schema.body.validate(req.body, options);

    if (error) {
        next(new ErrorResponse(`${error.message}`, 400));
    }
    req.body = value;
    next();

}

module.exports = lessonCreateDto;
