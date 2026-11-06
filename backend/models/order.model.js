module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "completed", "cancelled"),
            defaultValue: "pending",
        },
    }, {
        tableName: "orders",
        timestamps: true,
    });

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
        });
        Order.belongsTo(models.Product, {
            foreignKey: "product_id",
            as: "product",
        });
    };

    return Order;
};
