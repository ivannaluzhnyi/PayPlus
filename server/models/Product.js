const sequelize = require("../lib/sequelize");
const { DataTypes, Model } = require("sequelize");

class Product extends Model { }

Product.init({
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
            isDecimal: true
        },
    },
    states: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    }
},
    {
        sequelize,
        modelName: "Product",
    });

    Product.sync();

module.exports = Article;
