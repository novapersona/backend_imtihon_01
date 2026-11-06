module.exports = (sequelize, DataTypes) => {
    const QuizAttempt = sequelize.define("QuizAttempt", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        total_questions: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        earned_coins: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    }, {
        tableName: "quiz_attempts",
        timestamps: true,
    });

    QuizAttempt.associate = (models) => {
        QuizAttempt.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
        });
        QuizAttempt.belongsTo(models.Quiz, {
            foreignKey: "quiz_id",
            as: "quiz",
        });
    };

    return QuizAttempt;
};
