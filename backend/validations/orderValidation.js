const Joi = require("joi");

const validateOrder = (order) => {
    const schema = Joi.object({
        user_id: Joi.number().integer().required(),
        product_id: Joi.number().integer().required(),
        price: Joi.number().integer().min(1).optional(),
        status: Joi.string().valid("pending", "completed", "cancelled").optional(),
    });

    return schema.validate(order);
};

const validateOrderStatus = (data) => {
    const schema = Joi.object({
        status: Joi.string().valid("pending", "completed", "cancelled").required(),
    });

    return schema.validate(data);
};

module.exports = {
    validateOrder,
    validateOrderStatus,
};
