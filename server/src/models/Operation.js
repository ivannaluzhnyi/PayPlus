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
                products: {
                    allowNull: true,
                    type: DataTypes.JSON,
                },
            },
            {
                sequelize,
                modelName: "Operation",
                hooks: {
                    afterCreate: async (operation) => {
                        setTimeout(() => {
                            denormalizeTransaction(operation.transaction_id);
                        }, 500);
                    },
                    afterUpdate: async (operation) => {
                        setTimeout(() => {
                            denormalizeTransaction(operation.transaction_id);
                        }, 500);
                    },
                    afterDestroy: async (operation) => {
                        setTimeout(() => {
                            denormalizeTransaction(operation.transaction_id);
                        }, 500);
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
