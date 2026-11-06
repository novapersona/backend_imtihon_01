# Ilm Chashmasi - PostgreSQL REST API

Ushbu loyiha **"Ilm Chashmasi"** platformasi uchun PostgreSQL va Sequelize ORM asosida yaratilgan to'liq RESTful backend tizimi. Loyiha arxitekturasi va kodlash uslubi `psql` namunasiga to'liq moslangan.

---

## 🛠 Texnologiyalar
- **Node.js & Express 5** — REST API server
- **React 19 & Vite 8** — Zamonaviy SPA Frontend
- **PostgreSQL & Sequelize v6** — Relyatsion ma'lumotlar bazasi va ORM
- **Joi** — Request ma'lumotlarini validatsiya qilish
- **Swagger UI & swagger-jsdoc** — Interaktiv API hujjatlari
- **bcryptjs** — Foydalanuvchi parollarini xavfsiz heshlash
- **CORS & dotenv** — Muhit konfiguratsiyasi va CORS sozlamalari

---

## 📊 Ma'lumotlar Modeli (10 ta Entity / Jadval)

Talab qilingan kamida 7 ta ma'lumot o'rniga, tizim uchun to'liq 10 ta o'zaro bog'langan model yaratildi:

1. **`User` (Foydalanuvchilar)**: `id`, `username`, `email`, `password`, `role` (admin/user), `coins`.
2. **`Favorite` (Saralanganlar / Saqlangan maqolalar)**: `id`, `user_id`, `article_id` (User va Article o'rtasidagi bog'lanish).
3. **`Article` (Maqolalar)**: `id`, `title`, `content`, `image`, `views_count`, `author_id`, `category_id`.
4. **`Category` (Kategoriyalar)**: `id`, `name`, `description`, `icon`.
5. **`Quiz` (Testlar / Viktorinalar)**: `id`, `title`, `description`, `reward_coins`.
6. **`QuizWord` (Test so'zlari)**: `id`, `quiz_id`, `arabic`, `uzbek`, `wrong_opt1`, `wrong_opt2`, `wrong_opt3`.
7. **`QuizAttempt` (Test urinishlari/natijalari)**: `id`, `user_id`, `quiz_id`, `score`, `total_questions`, `earned_coins`.
8. **`Product` (Coin do'koni mahsulotlari)**: `id`, `title`, `description`, `image`, `price`, `stock`.
9. **`Order` (Buyurtmalar / Xaridlar)**: `id`, `user_id`, `product_id`, `price`, `status` (pending, completed, cancelled).
10. **`Comment` (Maqolalarga izohlar)**: `id`, `user_id`, `article_id`, `text`.

---

## 🚀 Ishga tushirish

### 1. Baza yaratish va jadvallarni to'ldirish (Seeding):
```bash
npm run seed
```
Bu buyruq bazani avtomatik tozalaydi, jadvallarni qayta quradi va barcha 10 ta jadvalga real ma'lumotlarni yozadi.

### 2. Serverni ishga tushirish:
```bash
npm start
# yoki dasturlash rejimi uchun:
npm run dev
```

Server odatiy tarzda `http://localhost:3333` manzilida ishlaydi va qurilgan React ilovasini avtomatik uzatadi.

### 3. React Frontendni dasturlash rejimida ishga tushirish (Hot Reload):
```bash
npm run client:dev
```
React Vite ilovasi `http://localhost:5173` manzilida ochiladi va `/api` so'rovlarini to'g'ridan-to'g'ri `http://localhost:3333` serveriga yo'naltiradi (proxy).

### 4. React Frontendni ishlab chiqarish (production) uchun yig'ish:
```bash
npm run client:build
# yoki
npm run build
```
Natija `frontend/dist` papkasiga saqlanadi va Express server tomonidan to'g'ridan-to'g'ri mijozlarga taqdim etiladi.

---

## 📖 Swagger API Hujjatlari
Server ishga tushgach, brauzerda quyidagi manzilni oching:
👉 **[http://localhost:3333/api-docs](http://localhost:3333/api-docs)**

---

## 📌 Asosiy API Endpointlar

### 👤 Foydalanuvchilar (`/api/users`)
- `POST /api/users` — Yangi foydalanuvchi qo'shish
- `POST /api/users/login` — Tizimga kirish (Login)
- `GET /api/users` — Barcha foydalanuvchilar
- `GET /api/users/:id` — ID bo'yicha foydalanuvchi (barcha saralanganlari va xaridlari bilan)
- `GET /api/users/search?query=...` — Qidiruv
- `PUT /api/users/:id` — Yangilash
- `DELETE /api/users/:id` — O'chirish
- `POST /api/users/:id/add-coins` — Foydalanuvchiga coin qo'shish (Admin)

### ⭐ Saralanganlar (`/api/favorites`)
- `POST /api/favorites` — Maqolani saralanganlarga qo'shish (`{ user_id, article_id }`)
- `GET /api/favorites` — Barcha saralanganlar
- `GET /api/favorites/user/:userId` — Foydalanuvchining saralangan maqolalari
- `DELETE /api/favorites/:id` — Saralanganlardan o'chirish
- `DELETE /api/favorites/user/:userId/article/:articleId` — User va maqola bo'yicha o'chirish

### 📝 Maqolalar (`/api/articles`)
- `POST /api/articles` — Yangi maqola
- `GET /api/articles` — Maqolalar ro'yxati (kategoriya bo'yicha filter mavjud)
- `GET /api/articles/search?query=...` — Sarlavha yoki matn bo'yicha qidiruv
- `GET /api/articles/:id` — ID bo'yicha (ko'rishlar soni +1 oshadi)
- `PUT /api/articles/:id` — Tahrirlash
- `DELETE /api/articles/:id` — O'chirish

### 🗂 Kategoriyalar (`/api/categories`)
- `POST /api/categories`, `GET /api/categories`, `GET /api/categories/:id`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`

### 🧠 Testlar (`/api/quizzes`)
- `POST /api/quizzes` — Yangi test (savollari bilan)
- `GET /api/quizzes` — Barcha testlar
- `GET /api/quizzes/:id` — Test ma'lumoti
- `POST /api/quizzes/words` — Testga qo'shimcha so'z qo'shish
- `DELETE /api/quizzes/words/:id` — So'zni o'chirish
- `POST /api/quizzes/submit` — Test natijasini topshirish (avtomatik coin hisoblaydi va balansga qo'shadi)
- `GET /api/quizzes/attempts/user/:userId` — Foydalanuvchining test topshirish tarixi

### 🎁 Mahsulotlar (`/api/products`)
- `POST /api/products`, `GET /api/products`, `GET /api/products/:id`, `PUT /api/products/:id`, `DELETE /api/products/:id`

### 🛒 Buyurtmalar (`/api/orders`)
- `POST /api/orders` — Xarid qilish (foydalanuvchi balansidan coin yechiladi)
- `GET /api/orders` — Barcha buyurtmalar (Admin)
- `PATCH /api/orders/:id/status` — Holatini o'zgartirish (`pending`, `completed`, `cancelled`)
- `GET /api/orders/user/:userId` — Foydalanuvchining xaridlari

### 💬 Izohlar (`/api/comments`)
- `POST /api/comments` — Izoh qoldirish
- `GET /api/comments` — Barcha izohlar
- `GET /api/comments/article/:articleId` — Maqolaning izohlari
- `DELETE /api/comments/:id` — Izohni o'chirish
