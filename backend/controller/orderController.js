const { Order, User, Product } = require("../models");
const { validateOrder, validateOrderStatus } = require("../validations/orderValidation");

exports.createOrder = async (req, res) => {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const { user_id, product_id } = req.body;

        const user = await User.findByPk(user_id);
        if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

        const product = await Product.findByPk(product_id);
        if (!product) return res.status(404).json({ message: "Mahsulot topilmadi" });

        const price = req.body.price || product.price;

        if ((user.coins || 0) < price) {
            return res.status(400).json({ message: "Hisobingizda coinlar yetarli emas!" });
        }

        // Deduct coins from user
        user.coins -= price;
        await user.save();

        const order = await Order.create({
            user_id,
            product_id,
            price,
            status: "pending",
        });

        res.status(201).json({
            message: "Buyurtma muvaffaqiyatli rasmiylashtirildi!",
            order,
            remainingCoins: user.coins,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: User, as: "user", attributes: ["id", "username", "coins"] },
                { model: Product, as: "product" },
            ],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [
                { model: User, as: "user", attributes: ["id", "username"] },
                { model: Product, as: "product" },
            ],
        });
        if (!order) return res.status(404).json({ message: "Buyurtma topilmadi" });
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    const { error } = validateOrderStatus(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: "Buyurtma topilmadi" });

        order.status = req.body.status;
        await order.save();
        res.status(200).json({ message: "Buyurtma holati yangilandi", order });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: "Buyurtma topilmadi" });

        await order.destroy();
        res.status(200).json({ message: "Buyurtma muvaffaqiyatli o'chirildi" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.findAll({
            where: { user_id: userId },
            include: [{ model: Product, as: "product" }],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
