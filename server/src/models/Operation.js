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
                        console.log("operation => ", operation);
                        console.log("operation => ", operation.toJSON());
                        console.log("Transaction => ", operation.Transaction);
                        // denormalizeTransaction(transaction, "create");
                    },
                    afterUpdate: async (operation) => {
                        // denormalizeTransaction(transaction, "update");
                    },
                    afterDestroy: async (operation) => {
                        // denormalizeTransaction(transaction, "delete");
                    },
                },
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Transaction, {
            foreignKey: "transaction_id",
        });
    }
}

export default Operation;
