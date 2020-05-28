const sequelize = require("../lib/sequelize");
const { DataTypes, Model } = require("sequelize");

class Transaction extends Model {
    
}
Transaction.init(
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

// Schema update
Transaction.sync();

module.exports = Transaction;
