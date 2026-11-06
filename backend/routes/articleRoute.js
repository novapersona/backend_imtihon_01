const express = require("express");
const router = express.Router();
const articleController = require("../controller/articleController");

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Maqolalar boshqaruvi
 */

/**
 * @swagger
 * /api/articles:
 *   post:
 *     tags: [Articles]
 *     summary: Yangi maqola yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *               author_id:
 *                 type: integer
 *               category_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Maqola yaratildi
 */
router.post("/articles", articleController.createArticle);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     tags: [Articles]
 *     summary: Barcha maqolalarni olish (kategoriya bo'yicha filtrlash mumkin)
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: integer
 *         description: Kategoriya ID bo'yicha filter
 *     responses:
 *       200:
 *         description: Maqolalar ro'yxati
 */
router.get("/articles", articleController.getArticles);

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     tags: [Articles]
 *     summary: Maqolalarni sarlavha yoki matn bo'yicha qidirish
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Topilgan maqolalar
 */
router.get("/articles/search", articleController.searchArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     tags: [Articles]
 *     summary: ID bo'yicha maqolani olish (ko'rishlar soni oshadi)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Maqola ma'lumoti
 */
router.get("/articles/:id", articleController.getArticleById);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     tags: [Articles]
 *     summary: Maqolani tahrirlash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *               category_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Yangilandi
 */
router.put("/articles/:id", articleController.updateArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     tags: [Articles]
 *     summary: Maqolani o'chirish
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
router.delete("/articles/:id", articleController.deleteArticle);

module.exports = router;
