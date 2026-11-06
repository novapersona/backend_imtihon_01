const { Category, Article } = require("../models");
const { validateCategory } = require("../validations/categoryValidation");

exports.createCategory = async (req, res) => {
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [{ model: Article, as: "articles" }],
        });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id, {
            include: [{ model: Article, as: "articles" }],
        });
        if (!category) return res.status(404).json({ message: "Kategoriya topilmadi" });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCategory = async (req, res) => {
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: "Kategoriya topilmadi" });

        await category.update(req.body);
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: "Kategoriya topilmadi" });

        await category.destroy();
        res.status(200).json({ message: "Kategoriya muvaffaqiyatli o'chirildi" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
