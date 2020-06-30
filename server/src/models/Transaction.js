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

    static associate(models) {
        this.belongsTo(models.Merchant, { foreignKey: "merchant_id" });
        this.belongsToMany(models.Product, {
            foreignKey: "transaction_id",
            through: "transaction_products",
            as: "products",
        });

        this.hasMany(models.Operation);
    }
}

module.exports = Transaction;
