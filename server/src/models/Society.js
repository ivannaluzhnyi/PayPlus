const { DataTypes, Model } = require("sequelize");

const { DEVISE } = require("../lib/constants");

class Society extends Model {
    static init(sequelize) {
        super.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                KBIS: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                contact: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                url_confirmation: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        isUrl: { msg: "Must be a valid url" },
                    },
                },
                url_cancel: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        isUrl: { msg: "Must be a valid url" },
                    },
                },
                devise: {
                    type: DataTypes.ENUM([...Object.keys(DEVISE)]),
                    defaultValue: DEVISE.EURO,
                },
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
                modelName: "Society",
            }
        );
    }
}

module.exports = Society;
