import { DataTypes, Model } from "sequelize";
import { OPERATIONS_STATE, OPERATIONS_TYPE } from "../lib/constants";

import denormalizeTransaction from "./denormalization/transaction";

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
                    allowNull: true,
                    type: DataTypes.ENUM([...Object.keys(OPERATIONS_TYPE)]),
                    defaultValue: null,
                },
                amount: {
                    type: DataTypes.DECIMAL,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: "Operation",
                hooks: {
                    afterCreate: async (operation) => {
                        denormalizeTransaction(operation.transaction_id);
                    },
                    afterUpdate: async (operation) => {
                        denormalizeTransaction(operation.transaction_id);
                    },
                    afterDestroy: async (operation) => {
                        denormalizeTransaction(operation.transaction_id);
                    },
                },
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Transaction, {
            foreignKey: "transaction_id",
            as: "transaction",
        });
    }
}

export default Operation;
