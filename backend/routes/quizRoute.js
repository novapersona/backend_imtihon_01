const express = require("express");
const router = express.Router();
const quizController = require("../controller/quizController");

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Arab tili va boshqa testlar boshqaruvi
 */

/**
 * @swagger
 * /api/quizzes:
 *   post:
 *     tags: [Quizzes]
 *     summary: Yangi test yaratish (savollar bilan birga)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               reward_coins:
 *                 type: integer
 *               words:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     arabic:
 *                       type: string
 *                     uzbek:
 *                       type: string
 *                     wrong_opt1:
 *                       type: string
 *                     wrong_opt2:
 *                       type: string
 *                     wrong_opt3:
 *                       type: string
 *     responses:
 *       201:
 *         description: Test yaratildi
 */
router.post("/quizzes", quizController.createQuiz);

/**
 * @swagger
 * /api/quizzes:
 *   get:
 *     tags: [Quizzes]
 *     summary: Barcha testlarni olish (savollari bilan)
 *     responses:
 *       200:
 *         description: Testlar ro'yxati
 */
router.get("/quizzes", quizController.getQuizzes);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   get:
 *     tags: [Quizzes]
 *     summary: ID bo'yicha testni olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Test ma'lumoti
 */
router.get("/quizzes/:id", quizController.getQuizById);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   put:
 *     tags: [Quizzes]
 *     summary: Testni tahrirlash
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
 *               description:
 *                 type: string
 *               reward_coins:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Yangilandi
 */
router.put("/quizzes/:id", quizController.updateQuiz);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   delete:
 *     tags: [Quizzes]
 *     summary: Testni o'chirish
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
router.delete("/quizzes/:id", quizController.deleteQuiz);

/**
 * @swagger
 * /api/quizzes/words:
 *   post:
 *     tags: [Quizzes]
 *     summary: Mavjud testga yangi savol/so'z qo'shish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quiz_id
 *               - arabic
 *               - uzbek
 *               - wrong_opt1
 *               - wrong_opt2
 *               - wrong_opt3
 *             properties:
 *               quiz_id:
 *                 type: integer
 *               arabic:
 *                 type: string
 *               uzbek:
 *                 type: string
 *               wrong_opt1:
 *                 type: string
 *               wrong_opt2:
 *                 type: string
 *               wrong_opt3:
 *                 type: string
 *     responses:
 *       201:
 *         description: Savol qo'shildi
 */
router.post("/quizzes/words", quizController.addWordToQuiz);

/**
 * @swagger
 * /api/quizzes/words/{id}:
 *   delete:
 *     tags: [Quizzes]
 *     summary: Test savolini o'chirish
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
router.delete("/quizzes/words/:id", quizController.deleteQuizWord);

/**
 * @swagger
 * /api/quizzes/submit:
 *   post:
 *     tags: [Quizzes]
 *     summary: Test natijasini topshirish va coinlarni hisobga olish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - quiz_id
 *               - score
 *               - total_questions
 *             properties:
 *               user_id:
 *                 type: integer
 *               quiz_id:
 *                 type: integer
 *               score:
 *                 type: integer
 *               total_questions:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Natija saqlandi va coinlar berildi
 */
router.post("/quizzes/submit", quizController.submitQuizAttempt);

/**
 * @swagger
 * /api/quizzes/attempts/user/{userId}:
 *   get:
 *     tags: [Quizzes]
 *     summary: Foydalanuvchining topshirgan testlari tarixi
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Urinishlar ro'yxati
 */
router.get("/quizzes/attempts/user/:userId", quizController.getUserQuizAttempts);

module.exports = router;
