const { Article, Category, User, Comment, Favorite } = require("../models");
const { validateArticle } = require("../validations/articleValidation");
const { Op } = require("sequelize");

exports.createArticle = async (req, res) => {
    const { error } = validateArticle(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const article = await Article.create(req.body);
        res.status(201).json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getArticles = async (req, res) => {
    try {
        const { category_id } = req.query;
        const whereClause = category_id ? { category_id } : {};

        const articles = await Article.findAll({
            where: whereClause,
            order: [["createdAt", "DESC"]],
            include: [
                { model: Category, as: "category" },
                { model: User, as: "author", attributes: ["id", "username"] },
                { model: Comment, as: "comments", include: [{ model: User, as: "user", attributes: ["id", "username"] }] },
            ],
        });
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id, {
            include: [
                { model: Category, as: "category" },
                { model: User, as: "author", attributes: ["id", "username"] },
                { model: Comment, as: "comments", include: [{ model: User, as: "user", attributes: ["id", "username"] }] },
                { model: Favorite, as: "favorites" },
            ],
        });
        if (!article) return res.status(404).json({ message: "Maqola topilmadi" });

        await article.increment("views_count");
        await article.reload();

        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateArticle = async (req, res) => {
    const { error } = validateArticle(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ message: "Maqola topilmadi" });

        await article.update(req.body);
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ message: "Maqola topilmadi" });

        await article.destroy();
        res.status(200).json({ message: "Maqola muvaffaqiyatli o'chirildi" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchArticles = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ message: "Qidiruv so'zi kiritilmadi" });

        const articles = await Article.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${query}%` } },
                    { content: { [Op.iLike]: `%${query}%` } },
                ],
            },
            include: [
                { model: Category, as: "category" },
                { model: User, as: "author", attributes: ["id", "username"] },
            ],
        });
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
