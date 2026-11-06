const Joi = require("joi");

const validateArticle = (article) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(255).required(),
        content: Joi.string().min(5).required(),
        image: Joi.string().uri().allow("", null).optional(),
        author_id: Joi.number().integer().allow(null).optional(),
        category_id: Joi.number().integer().allow(null).optional(),
        views_count: Joi.number().integer().min(0).optional(),
    });

    return schema.validate(article);
};

module.exports = { validateArticle };
