const { DataTypes, Model } = require("sequelize");

class Operation extends Model {
    static init(sequelize) {
        super.init(
            {
                states: {
                    type: DataTypes.ENUM(["done", "refunded", "Waiting"]),
                    defaultValue: "Waiting",
                },
                Amount: {
                    type: DataTypes.DECIMAL,
                    allowNull: true,
                },
                date: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                modelName: "Operation",
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Transaction, { foreignKey: "transaction_id" });
    }
}

module.exports = Operation;
