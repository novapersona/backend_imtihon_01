const { User, Favorite, Article, QuizAttempt, Order, Comment } = require("../models");
const { validateUser, validateUserUpdate, validateAddCoins } = require("../validations/userValidation");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const existing = await User.findOne({ where: { username: req.body.username } });
        if (existing) {
            return res.status(400).json({ message: "Bu foydalanuvchi nomi allaqachon band" });
        }

        const userData = { ...req.body };
        if (!userData.email || (typeof userData.email === "string" && !userData.email.trim())) {
            delete userData.email;
        }

        const user = await User.create(userData);
        const userSafe = user.toJSON();
        delete userSafe.password;
        res.status(201).json(userSafe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] },
            include: [
                {
                    model: Favorite,
                    as: "favorites",
                    include: [{ model: Article, as: "article" }],
                    required: false,
                },
                { model: Order, as: "orders", required: false },
            ],
            order: [["id", "ASC"]],
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const identifier = req.params.id;
        const isNumeric = !isNaN(identifier) && !isNaN(parseFloat(identifier));

        const whereClause = isNumeric
            ? { id: parseInt(identifier, 10) }
            : { username: identifier };

        const user = await User.findOne({
            where: whereClause,
            attributes: { exclude: ["password"] },
            include: [
                {
                    model: Favorite,
                    as: "favorites",
                    include: [{ model: Article, as: "article" }],
                    required: false,
                },
                { model: QuizAttempt, as: "quizAttempts", required: false },
                { model: Order, as: "orders", required: false },
                { model: Comment, as: "comments", required: false },
            ],
        });
        if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const { error } = validateUserUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

        await user.update(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

        await user.destroy();
        res.status(200).json({ message: "Foydalanuvchi muvaffaqiyatli o'chirildi" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ message: "Qidiruv so'zi kiritilmadi" });

        const users = await User.findAll({
            where: {
                [Op.or]: [
                    { username: { [Op.iLike]: `%${query}%` } },
                    { email: { [Op.iLike]: `%${query}%` } },
                ],
            },
            attributes: { exclude: ["password"] },
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username va parol kiritilishi shart" });
        }

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "Noto'g'ri login yoki parol" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Noto'g'ri login yoki parol" });
        }

        const userSafe = user.toJSON();
        delete userSafe.password;
        res.status(200).json({ message: "Muvaffaqiyatli kirdingiz", user: userSafe });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addCoins = async (req, res) => {
    const { error } = validateAddCoins(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

        user.coins = (user.coins || 0) + Number(req.body.amount);
        await user.save();
        res.status(200).json({ message: "Coinlar qo'shildi", coins: user.coins });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
