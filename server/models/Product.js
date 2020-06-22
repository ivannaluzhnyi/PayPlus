const sequelize = require("../lib/sequelize");
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
                    defaultValue: 0,
                },
            },
            {
                sequelize,
                modelName: "Product",
            }
        );
    }
}

module.exports = Product;
