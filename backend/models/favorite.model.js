module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define("Favorite", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: "favorites",
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["user_id", "article_id"],
            },
        ],
    });

    Favorite.associate = (models) => {
        Favorite.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
        });
        Favorite.belongsTo(models.Article, {
            foreignKey: "article_id",
            as: "article",
        });
    };

    return Favorite;
};
