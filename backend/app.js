const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { sequelize } = require("./models");
const setupSwagger = require("./swagger/swagger");

// Routes
const userRoutes = require("./routes/userRoute");
const categoryRoutes = require("./routes/categoryRoute");
const articleRoutes = require("./routes/articleRoute");
const favoriteRoutes = require("./routes/favoriteRoute");
const quizRoutes = require("./routes/quizRoute");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoute");
const commentRoutes = require("./routes/commentRoute");

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Serve frontend static files (prioritizing React app)
const reactDist = path.join(__dirname, "frontend", "dist");
if (fs.existsSync(reactDist)) {
    app.use(express.static(reactDist));
} else {
    app.use(express.static(path.join(__dirname, "public")));
}

// API Routes
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", articleRoutes);
app.use("/api", favoriteRoutes);
app.use("/api", quizRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", commentRoutes);

// Health check / API root
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Ilm Chashmasi PostgreSQL API blok ishlamoqda",
        swagger: "/api-docs",
        entities: [
            "Users",
            "Categories",
            "Articles",
            "Favorites (Saralanganlar)",
            "Quizzes",
            "QuizWords",
            "QuizAttempts",
            "Products",
            "Orders",
            "Comments",
        ],
    });
});

// SPA Fallback for client routing
app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/api-docs')) {
        if (fs.existsSync(reactDist)) {
            return res.sendFile(path.join(reactDist, "index.html"));
        } else {
            return res.sendFile(path.join(__dirname, "public", "index.html"));
        }
    }
    next();
});

// Swagger Documentation
setupSwagger(app);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

sequelize.sync({ alter: true }).catch((err) => {
    console.warn("Database connection warning (Sequelize):", err.message);
});

module.exports = app;
