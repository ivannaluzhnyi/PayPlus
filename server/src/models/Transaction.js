import { DataTypes, Model } from "sequelize";
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

export default Transaction;
