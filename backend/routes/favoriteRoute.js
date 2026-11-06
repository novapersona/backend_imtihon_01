const express = require("express");
const router = express.Router();
const favoriteController = require("../controller/favoriteController");

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Saralanganlar (Saqlangan maqolalar) boshqaruvi
 */

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     tags: [Favorites]
 *     summary: Maqolani saralanganlarga qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - article_id
 *             properties:
 *               user_id:
 *                 type: integer
 *               article_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Saralanganlarga qo'shildi
 */
router.post("/favorites", favoriteController.addFavorite);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     tags: [Favorites]
 *     summary: Barcha saralanganlar ro'yxati
 *     responses:
 *       200:
 *         description: Saralanganlar ro'yxati
 */
router.get("/favorites", favoriteController.getFavorites);

/**
 * @swagger
 * /api/favorites/user/{userId}:
 *   get:
 *     tags: [Favorites]
 *     summary: Muayyan foydalanuvchining saralangan maqolalari
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Foydalanuvchining saralanganlari
 */
router.get("/favorites/user/:userId", favoriteController.getUserFavorites);

/**
 * @swagger
 * /api/favorites/{id}:
 *   delete:
 *     tags: [Favorites]
 *     summary: Saralanganlardan ID bo'yicha o'chirish
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
router.delete("/favorites/:id", favoriteController.removeFavorite);

/**
 * @swagger
 * /api/favorites/user/{userId}/article/{articleId}:
 *   delete:
 *     tags: [Favorites]
 *     summary: Foydalanuvchi va maqola bo'yicha saralanganlardan o'chirish
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: O'chirildi
 */
router.delete("/favorites/user/:userId/article/:articleId", favoriteController.removeFavoriteByUserAndArticle);

module.exports = router;
