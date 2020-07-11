import { DataTypes, Model } from "sequelize";
import makeToken from "../lib/makeToken";
import denormalize from "./denormalization/transaction";
class Transaction extends Model {
    static init(sequelize) {
        super.init(
            {
                client_first_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                client_last_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                delivery_country: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                delivery_city: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                delivery_address: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                delivery_zip_code: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                order_amount: {
                    type: DataTypes.DECIMAL,
                    allowNull: false,
                },
                products: {
                    allowNull: false,
                    type: DataTypes.JSON,
                },
                order_token: {
                    type: DataTypes.STRING,
                },
            },
            {
                sequelize,
                modelName: "Transaction",
                hooks: {
                    beforeCreate: async (transaction) => {
                        console.log("beforeCreate =>", transaction);
                        transaction.order_token = makeToken(172, true);
                    },
                },
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Merchant, { foreignKey: "merchant_id" });

        this.hasMany(models.Operation, {
            as: "linked_transaction",
        });

        // TODO  => https://github.com/sequelize/sequelize/issues/8444   delete cascade not work, delete just transaction_id
        // this.hasMany(models.Operation, {
        //     as: "linked_transaction",
        //     onDelete: "CASCADE",
        //     hooks: true,
        // });
    }
}

export default Transaction;
