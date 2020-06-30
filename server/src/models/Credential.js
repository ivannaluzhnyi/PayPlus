import { Model, DataTypes } from "sequelize";

class Credential extends Model {
    static init(sequelize) {
        super.init(
            {
                client_token: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                client_secret: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Credential",
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Merchant, { foreignKey: "merchant_id" });
    }
}

export default Credential;
