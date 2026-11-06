const Joi = require("joi");

const validateQuiz = (quiz) => {
    const wordSchema = Joi.object({
        arabic: Joi.string().required(),
        uzbek: Joi.string().required(),
        wrong_opt1: Joi.string().required(),
        wrong_opt2: Joi.string().required(),
        wrong_opt3: Joi.string().required(),
    });

    const schema = Joi.object({
        title: Joi.string().min(3).max(255).required(),
        description: Joi.string().allow("", null).optional(),
        reward_coins: Joi.number().integer().min(1).optional(),
        words: Joi.array().items(wordSchema).min(1).optional(),
    });

    return schema.validate(quiz);
};

const validateQuizWord = (word) => {
    const schema = Joi.object({
        quiz_id: Joi.number().integer().required(),
        arabic: Joi.string().required(),
        uzbek: Joi.string().required(),
        wrong_opt1: Joi.string().required(),
        wrong_opt2: Joi.string().required(),
        wrong_opt3: Joi.string().required(),
    });

    return schema.validate(word);
};

const validateQuizAttempt = (attempt) => {
    const schema = Joi.object({
        user_id: Joi.number().integer().required(),
        quiz_id: Joi.number().integer().required(),
        score: Joi.number().integer().min(0).required(),
        total_questions: Joi.number().integer().min(1).required(),
    });

    return schema.validate(attempt);
};

module.exports = {
    validateQuiz,
    validateQuizWord,
    validateQuizAttempt,
};
