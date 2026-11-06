const Joi = require("joi");

const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().optional().allow(null, ""),
        password: Joi.string().min(4).required(),
        role: Joi.string().valid("admin", "user").optional(),
        coins: Joi.number().integer().min(0).optional(),
    });

    return schema.validate(user);
};

const validateUserUpdate = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).optional(),
        email: Joi.string().email().optional().allow(null, ""),
        password: Joi.string().min(4).optional(),
        role: Joi.string().valid("admin", "user").optional(),
        coins: Joi.number().integer().min(0).optional(),
    });

    return schema.validate(user);
};

const validateAddCoins = (data) => {
    const schema = Joi.object({
        amount: Joi.number().integer().min(1).required(),
    });

    return schema.validate(data);
};

module.exports = {
    validateUser,
    validateUserUpdate,
    validateAddCoins,
};
