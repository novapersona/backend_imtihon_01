const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
            },
            set(value) {
                if (!value || (typeof value === "string" && !value.trim())) {
                    this.setDataValue("email", null);
                } else {
                    this.setDataValue("email", value.trim());
                }
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("admin", "user"),
            defaultValue: "user",
        },
        coins: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    }, {
        tableName: "users",
        timestamps: true,
    });

    User.beforeSave(async (user) => {
        if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Article, {
            foreignKey: "author_id",
            as: "articles",
            onDelete: "SET NULL",
        });
        User.hasMany(models.Favorite, {
            foreignKey: "user_id",
            as: "favorites",
            onDelete: "CASCADE",
        });
        User.hasMany(models.Comment, {
            foreignKey: "user_id",
            as: "comments",
            onDelete: "CASCADE",
        });
        User.hasMany(models.Order, {
            foreignKey: "user_id",
            as: "orders",
            onDelete: "CASCADE",
        });
        User.hasMany(models.QuizAttempt, {
            foreignKey: "user_id",
            as: "quizAttempts",
            onDelete: "CASCADE",
        });
    };

    return User;
};
