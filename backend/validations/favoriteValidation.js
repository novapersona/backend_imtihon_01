const Joi = require("joi");

const validateFavorite = (favorite) => {
    const schema = Joi.object({
        user_id: Joi.number().integer().required(),
        article_id: Joi.number().integer().required(),
    });

    return schema.validate(favorite);
};

module.exports = { validateFavorite };
