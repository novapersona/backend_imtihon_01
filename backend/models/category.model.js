module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "fas fa-book",
        },
    }, {
        tableName: "categories",
        timestamps: true,
    });

    Category.associate = (models) => {
        Category.hasMany(models.Article, {
            foreignKey: "category_id",
            as: "articles",
            onDelete: "SET NULL",
        });
    };

    return Category;
};
