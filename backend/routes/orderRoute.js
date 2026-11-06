const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Mahsulot buyurtmalari (xaridlar)
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags: [Orders]
 *     summary: Yangi xarid/buyurtma berish (foydalanuvchi coinlari hisobidan yechiladi)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - product_id
 *             properties:
 *               user_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               price:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Buyurtma qabul qilindi
 *       400:
 *         description: Coinlar yetarli emas
 */
router.post("/orders", orderController.createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags: [Orders]
 *     summary: Barcha buyurtmalarni olish (Admin)
 *     responses:
 *       200:
 *         description: Buyurtmalar ro'yxati
 */
router.get("/orders", orderController.getOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: ID bo'yicha buyurtma
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Buyurtma ma'lumoti
 */
router.get("/orders/:id", orderController.getOrderById);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     tags: [Orders]
 *     summary: Buyurtma holatini o'zgartirish (masalan, 'completed')
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed, cancelled]
 *     responses:
 *       200:
 *         description: Holat yangilandi
 */
router.patch("/orders/:id/status", orderController.updateOrderStatus);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     tags: [Orders]
 *     summary: Buyurtmani o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: O'chirildi
 */
router.delete("/orders/:id", orderController.deleteOrder);

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     tags: [Orders]
 *     summary: Foydalanuvchining xaridlari ro'yxati
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xaridlar ro'yxati
 */
router.get("/orders/user/:userId", orderController.getUserOrders);

module.exports = router;
