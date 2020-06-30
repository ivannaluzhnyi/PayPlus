import { Model, DataTypes } from "sequelize";
import { DEVISE, USER_STATUS } from "../lib/constants";

class Merchant extends Model {
    static init(sequelize) {
        super.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                country: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                city: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                address: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                zip_code: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                KBIS: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                url_cancel: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                url_confirmation: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                devise: {
                    type: DataTypes.ENUM([...Object.keys(DEVISE)]),
                    defaultValue: DEVISE.EURO,
                },

                state: {
                    type: DataTypes.ENUM([...Object.keys(USER_STATUS)]),
                    defaultValue: USER_STATUS.PENDING,
                },
            },
            {
                sequelize,
                modelName: "Merchant",
                indexes: [
                    {
                        unique: true,
                        fields: ["name"],
                    },
                ],
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Transaction);
        this.hasMany(models.Credential);
        this.belongsToMany(models.User, {
            foreignKey: "merchant_id",
            through: "users_merchants",
            as: "users",
        });
    }
}

export default Merchant;
