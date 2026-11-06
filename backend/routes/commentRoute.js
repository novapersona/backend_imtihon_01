const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Maqolalarga izohlar
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     tags: [Comments]
 *     summary: Maqolaga izoh qoldirish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - article_id
 *               - text
 *             properties:
 *               user_id:
 *                 type: integer
 *               article_id:
 *                 type: integer
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Izoh qo'shildi
 */
router.post("/comments", commentController.createComment);

/**
 * @swagger
 * /api/comments:
 *   get:
 *     tags: [Comments]
 *     summary: Barcha izohlarni olish
 *     responses:
 *       200:
 *         description: Barcha izohlar ro'yxati
 */
router.get("/comments", commentController.getComments);

/**
 * @swagger
 * /api/comments/article/{articleId}:
 *   get:
 *     tags: [Comments]
 *     summary: Maqolaning barcha izohlarini olish
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Izohlar ro'yxati
 */
router.get("/comments/article/:articleId", commentController.getArticleComments);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: Izohni o'chirish
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
router.delete("/comments/:id", commentController.deleteComment);

module.exports = router;
