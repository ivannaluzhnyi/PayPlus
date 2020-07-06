import { DataTypes, Model } from "sequelize";
import { OPERATIONS_STATE, OPERATIONS_TYPE } from "../lib/constants";

class Operation extends Model {
    static init(sequelize) {
        super.init(
            {
                state: {
                    allowNull: false,
                    type: DataTypes.ENUM([...Object.keys(OPERATIONS_STATE)]),
                    defaultValue: OPERATIONS_STATE.CREATED,
                },
                type: {
                    allowNull: false,
                    type: DataTypes.ENUM([...Object.keys(OPERATIONS_TYPE)]),
                    defaultValue: OPERATIONS_TYPE.CAPTURE,
                },
                amount: {
                    type: DataTypes.DECIMAL,
                    allowNull: true,
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

export default Operation;
