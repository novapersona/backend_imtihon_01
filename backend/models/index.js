const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user.model")(sequelize, Sequelize);
const Category = require("./category.model")(sequelize, Sequelize);
const Article = require("./article.model")(sequelize, Sequelize);
const Favorite = require("./favorite.model")(sequelize, Sequelize);
const Quiz = require("./quiz.model")(sequelize, Sequelize);
const QuizWord = require("./quizWord.model")(sequelize, Sequelize);
const QuizAttempt = require("./quizAttempt.model")(sequelize, Sequelize);
const Product = require("./product.model")(sequelize, Sequelize);
const Order = require("./order.model")(sequelize, Sequelize);
const Comment = require("./comment.model")(sequelize, Sequelize);

const models = {
    User,
    Category,
    Article,
    Favorite,
    Quiz,
    QuizWord,
    QuizAttempt,
    Product,
    Order,
    Comment,
};

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = {
    ...models,
    sequelize,
    Sequelize,
};
