module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define("Article", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        views_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: "articles",
        timestamps: true,
    });

    Article.associate = (models) => {
        Article.belongsTo(models.User, {
            foreignKey: "author_id",
            as: "author",
        });
        Article.belongsTo(models.Category, {
            foreignKey: "category_id",
            as: "category",
        });
        Article.hasMany(models.Favorite, {
            foreignKey: "article_id",
            as: "favorites",
            onDelete: "CASCADE",
        });
        Article.hasMany(models.Comment, {
            foreignKey: "article_id",
            as: "comments",
            onDelete: "CASCADE",
        });
    };

    return Article;
};
