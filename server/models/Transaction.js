const sequelize = require("../lib/sequelize");
const { DataTypes, Model } = require("sequelize");

class Transaction extends Model {
    static init(sequelize) {
        super.init(
            {
                deliveryZipCode: DataTypes.STRING,
                deliveryAddress: DataTypes.STRING,
                deliveryCity: DataTypes.STRING,
                orderAmount: DataTypes.DECIMAL,
            },
            {
                sequelize,
                modelName: "Transaction",
            }
        );
    }
}

module.exports = Transaction;
