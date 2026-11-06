const Joi = require("joi");

const validateComment = (comment) => {
    const schema = Joi.object({
        user_id: Joi.number().integer().required(),
        article_id: Joi.number().integer().required(),
        text: Joi.string().min(1).max(1000).required(),
    });

    return schema.validate(comment);
};

module.exports = { validateComment };
