const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ilm Chashmasi PostgreSQL REST API",
            version: "1.0.0",
            description: "Ilm Chashmasi platformasi uchun to'liq PostgreSQL + Sequelize REST API hujjatlari. Kamida 7 ta ma'lumot (User, Saralanganlar/Favorites, Maqolalar, Kategoriyalar, Testlar, Savollar, Mahsulotlar, Buyurtmalar, Izohlar).",
            contact: {
                name: "Ilm Chashmasi Jamoasi",
            },
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3333}`,
                description: "Mahalliy (Local) server",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
