const Joi = require("joi");

const validateProduct = (product) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(255).required(),
        description: Joi.string().allow("", null).optional(),
        image: Joi.string().required(),
        price: Joi.number().integer().min(1).required(),
        stock: Joi.number().integer().min(0).optional(),
    });

    return schema.validate(product);
};

module.exports = { validateProduct };
