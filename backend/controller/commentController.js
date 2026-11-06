const { Comment, User, Article } = require("../models");
const { validateComment } = require("../validations/commentValidation");

exports.createComment = async (req, res) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const { user_id, article_id } = req.body;

        const user = await User.findByPk(user_id);
        if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

        const article = await Article.findByPk(article_id);
        if (!article) return res.status(404).json({ message: "Maqola topilmadi" });

        const comment = await Comment.create(req.body);
        const fullComment = await Comment.findByPk(comment.id, {
            include: [{ model: User, as: "user", attributes: ["id", "username"] }],
        });

        res.status(201).json(fullComment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            include: [
                { model: User, as: "user", attributes: ["id", "username"] },
                { model: Article, as: "article", attributes: ["id", "title"] },
            ],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getArticleComments = async (req, res) => {
    try {
        const { articleId } = req.params;
        const comments = await Comment.findAll({
            where: { article_id: articleId },
            include: [{ model: User, as: "user", attributes: ["id", "username"] }],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) return res.status(404).json({ message: "Izoh topilmadi" });

        await comment.destroy();
        res.status(200).json({ message: "Izoh muvaffaqiyatli o'chirildi" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
