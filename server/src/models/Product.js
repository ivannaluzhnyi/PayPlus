const { DataTypes, Model } = require("sequelize");

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                price: {
                    type: DataTypes.DECIMAL,
                    allowNull: false,
                    validate: {
                        isDecimal: true,
                    },
                },
                states: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                modelName: "Product",
            }
        );
    }

    static associate(models) {
        this.belongsToMany(models.Transaction, {
            foreignKey: "product_id",
            through: "transaction_products",
            as: "transactions",
        });
    }
}

module.exports = Product;
