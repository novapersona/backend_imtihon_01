const { Favorite, User, Article, Category } = require("../models");
const { validateFavorite } = require("../validations/favoriteValidation");

exports.addFavorite = async (req, res) => {
    const { error } = validateFavorite(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const { user_id, article_id } = req.body;

        const user = await User.findByPk(user_id);
        if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

        const article = await Article.findByPk(article_id);
        if (!article) return res.status(404).json({ message: "Maqola topilmadi" });

        const [favorite, created] = await Favorite.findOrCreate({
            where: { user_id, article_id },
            defaults: { user_id, article_id },
        });

        if (!created) {
            return res.status(200).json({ message: "Bu maqola allaqachon saralanganlarda mavjud", favorite });
        }

        res.status(201).json({ message: "Maqola saralanganlarga qo'shildi", favorite });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.findAll({
            include: [
                { model: User, as: "user", attributes: ["id", "username"] },
                {
                    model: Article,
                    as: "article",
                    include: [{ model: Category, as: "category" }],
                },
            ],
        });
        res.status(200).json(favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserFavorites = async (req, res) => {
    try {
        const { userId } = req.params;
        const favorites = await Favorite.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Article,
                    as: "article",
                    include: [
                        { model: Category, as: "category" },
                        { model: User, as: "author", attributes: ["id", "username"] },
                    ],
                },
            ],
        });
        res.status(200).json(favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findByPk(req.params.id);
        if (!favorite) return res.status(404).json({ message: "Saralangan ma'lumot topilmadi" });

        await favorite.destroy();
        res.status(200).json({ message: "Maqola saralanganlardan o'chirildi" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.removeFavoriteByUserAndArticle = async (req, res) => {
    try {
        const { userId, articleId } = req.params;
        const favorite = await Favorite.findOne({
            where: { user_id: userId, article_id: articleId },
        });
        if (!favorite) return res.status(404).json({ message: "Saralangan ma'lumot topilmadi" });

        await favorite.destroy();
        res.status(200).json({ message: "Maqola saralanganlardan o'chirildi" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
