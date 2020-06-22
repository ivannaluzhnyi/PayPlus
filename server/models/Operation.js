const { DataTypes, Model } = require("sequelize");

class Operation extends Model {
    static init(sequelize) {
        super.init(
            {
                states: {
                    type: DataTypes.ENUM([
                        "done",
                        "refunded",
                        "deleted",
                        "Waiting",
                    ]),
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
}

module.exports = Operation;
