const joi = require('joi');

const userLoginDto = {
    body: joi.object({
        email: joi.string()
            .email()
            .required(),
        pwd: joi.string()
            .min(6)
            .max(30)
            .required()
    }),
}