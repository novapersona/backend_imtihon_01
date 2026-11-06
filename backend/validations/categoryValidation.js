const Joi = require("joi");

const validateCategory = (category) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        description: Joi.string().allow("", null).optional(),
        icon: Joi.string().allow("", null).optional(),
    });

    return schema.validate(category);
};

module.exports = { validateCategory };
