# Ilm Chashmasi — Fullstack Ta'lim Platformasi

Ushbu loyiha **React 19 (Vite)** frontend va **Node.js (Express 5 & PostgreSQL Sequelize)** backenddan iborat to'liq integratsiyalangan tizimdir.

---

## 📁 Loyiha Strukturasi

```
Ilm Chashmasi/
├── backend/                  # Express REST API & PostgreSQL Sequelize ORM
│   ├── app.js               # Server fayli (React frontendni ham tarqatadi)
│   ├── models/              # Sequelize jadvallari (10 ta model)
│   ├── routes/              # API yo'nalishlari (/api/...)
│   └── package.json
├── frontend/                 # Zamonaviy Vite + React 19 ilovasi
│   ├── src/                 # React komponentlari & kontekst
│   ├── dist/                # Qurilgan production fayllar
│   └── package.json
├── start-dev.js              # Backend va Frontendni bir vaqtda ishga tushiruvchi skript
├── package.json              # Asosiy monorepo package.json
└── README.md
```

---

## 🚀 Qanday qilib bir vaqtda ishga tushirish mumkin?

### 1. Ikkalasini birgalikda ishga tushirish (Development rejimi — Tavsiya etiladi):
Loyiha asosiy papkasida quyidagi buyruqni bering:
```bash
npm run dev
```
Ushbu bitta buyruq avtomatik ravishda:
- **Backend API serverini**: `http://localhost:3333`
- **React Frontend serverini**: `http://localhost:5173`
bir vaqtda ishga tushiradi. Konsolda har ikkala servisdan kelayotgan xabarlar alohida ranglar bilan ko'rinadi (`[BACKEND]` va `[FRONTEND]`).

Frontenddagi barcha `/api` so'rovlari avtomatik ravishda backendga yo'naltiriladi (proxy).

---

### 2. Yagona portda (Production rejimi):
Agar faqat bitta portda (`http://localhost:3333`) ishlashini xohlasangiz:
```bash
npm start
```
Express server `frontend/dist` papkasidagi React ilovasini va API yo'nalishlarini bitta `http://localhost:3333` manzilida taqdim etadi.

---

### 3. Alohida boshqarish buyruqlari:

- **Faqat backendni ishga tushirish:**
  ```bash
  npm run dev:backend
  ```
- **Faqat frontendni ishga tushirish:**
  ```bash
  npm run dev:frontend
  ```
- **React frontendni qayta yig'ish (build):**
  ```bash
  npm run build
  ```
- **Ma'lumotlar bazasini to'ldirish (seed):**
  ```bash
  npm run seed
  ```
