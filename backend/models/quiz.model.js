module.exports = (sequelize, DataTypes) => {
    const Quiz = sequelize.define("Quiz", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        reward_coins: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    }, {
        tableName: "quizzes",
        timestamps: true,
    });

    Quiz.associate = (models) => {
        Quiz.hasMany(models.QuizWord, {
            foreignKey: "quiz_id",
            as: "words",
            onDelete: "CASCADE",
        });
        Quiz.hasMany(models.QuizAttempt, {
            foreignKey: "quiz_id",
            as: "attempts",
            onDelete: "CASCADE",
        });
    };

    return Quiz;
};
