module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
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
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 10,
        },
    }, {
        tableName: "products",
        timestamps: true,
    });

    Product.associate = (models) => {
        Product.hasMany(models.Order, {
            foreignKey: "product_id",
            as: "orders",
            onDelete: "SET NULL",
        });
    };

    return Product;
};
