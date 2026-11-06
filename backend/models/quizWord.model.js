module.exports = (sequelize, DataTypes) => {
    const QuizWord = sequelize.define("QuizWord", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        arabic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uzbek: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wrong_opt1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wrong_opt2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wrong_opt3: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "quiz_words",
        timestamps: true,
    });

    QuizWord.associate = (models) => {
        QuizWord.belongsTo(models.Quiz, {
            foreignKey: "quiz_id",
            as: "quiz",
        });
    };

    return QuizWord;
};
