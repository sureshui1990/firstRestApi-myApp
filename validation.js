const Joi = require('@hapi/joi');

const registerValidation = (regData) => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    };
    return Joi.validate(regData, schema);
}

const loginValidation = (loginData) => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    };
    return Joi.validate(loginData, schema);
}

module.exports = {
    registerValidation,
    loginValidation
}