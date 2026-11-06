module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
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
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        tableName: "comments",
        timestamps: true,
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
        });
        Comment.belongsTo(models.Article, {
            foreignKey: "article_id",
            as: "article",
        });
    };

    return Comment;
};
