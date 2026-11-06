const { Quiz, QuizWord, QuizAttempt, User } = require("../models");
const { validateQuiz, validateQuizWord, validateQuizAttempt } = require("../validations/quizValidation");

exports.createQuiz = async (req, res) => {
    const { error } = validateQuiz(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const { title, description, reward_coins, words } = req.body;
        const quiz = await Quiz.create({ title, description, reward_coins });

        if (words && Array.isArray(words) && words.length > 0) {
            const wordRecords = words.map(w => ({ ...w, quiz_id: quiz.id }));
            await QuizWord.bulkCreate(wordRecords);
        }

        const createdQuiz = await Quiz.findByPk(quiz.id, {
            include: [{ model: QuizWord, as: "words" }],
        });

        res.status(201).json(createdQuiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.findAll({
            include: [{ model: QuizWord, as: "words" }],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id, {
            include: [{ model: QuizWord, as: "words" }],
        });
        if (!quiz) return res.status(404).json({ message: "Test topilmadi" });
        res.status(200).json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateQuiz = async (req, res) => {
    const { error } = validateQuiz(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) return res.status(404).json({ message: "Test topilmadi" });

        await quiz.update(req.body);
        res.status(200).json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) return res.status(404).json({ message: "Test topilmadi" });

        await quiz.destroy();
        res.status(200).json({ message: "Test muvaffaqiyatli o'chirildi" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addWordToQuiz = async (req, res) => {
    const { error } = validateQuizWord(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const word = await QuizWord.create(req.body);
        res.status(201).json(word);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteQuizWord = async (req, res) => {
    try {
        const word = await QuizWord.findByPk(req.params.id);
        if (!word) return res.status(404).json({ message: "Savol/so'z topilmadi" });

        await word.destroy();
        res.status(200).json({ message: "So'z muvaffaqiyatli o'chirildi" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.submitQuizAttempt = async (req, res) => {
    const { error } = validateQuizAttempt(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const { user_id, quiz_id, score, total_questions } = req.body;

        const user = await User.findByPk(user_id);
        if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

        const quiz = await Quiz.findByPk(quiz_id);
        if (!quiz) return res.status(404).json({ message: "Test topilmadi" });

        // Calculate earned coins: score * reward_coins
        const rewardMultiplier = quiz.reward_coins || 1;
        const earned_coins = score * rewardMultiplier;

        const attempt = await QuizAttempt.create({
            user_id,
            quiz_id,
            score,
            total_questions,
            earned_coins,
        });

        // Add coins to user balance
        user.coins = (user.coins || 0) + earned_coins;
        await user.save();

        res.status(201).json({
            message: "Test natijasi qabul qilindi",
            attempt,
            userCoins: user.coins,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserQuizAttempts = async (req, res) => {
    try {
        const { userId } = req.params;
        const attempts = await QuizAttempt.findAll({
            where: { user_id: userId },
            include: [{ model: Quiz, as: "quiz" }],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(attempts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
