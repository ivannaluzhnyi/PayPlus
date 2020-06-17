const sequelize = require("../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const Operation = require("./Operation")

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

Transaction.hasMany(Operation);
Operation.belongsTo(Transaction);

Transaction.sync();


module.exports = Transaction;
