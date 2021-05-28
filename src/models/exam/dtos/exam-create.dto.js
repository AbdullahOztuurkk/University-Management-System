const joi = require('joi');
const ErrorResponse = require('../../../utils/ErrorResponse');
const options = require('../../dto-options');

function examCreateDto(req, res, next) {

    const schema = {
        body: joi.object({
            score: joi.number()
                .min(0)
                .max(100)
                .required(),
            type: joi.string()
                .valid('MID', 'PROJECT', 'FINAL','MAKEUP')
                .required(),
            announcementDate:joi.date()
                .default(Date.now())
                .required(),
            userLessonId: joi.number(),
        }),
    }

    const { error, value } = schema.body.validate(req.body, options);

    if (error) {
        next(new ErrorResponse(`${error.message}`, 400));
    }
    req.body = value;
    next();

}

module.exports = examCreateDto;