const sequelize = require("../lib/sequelize");
const { DataTypes, Model } = require("sequelize");

class Society extends Model { }

Society.init({

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
        }
    },
    url_cancel: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: { msg: "Must be a valid url" },
        }
    },
    devise: {
        type: DataTypes.EMUM(['Euro', 'Dollar', 'Yen']),
        defaultValue: "Euro",
    },
    client_token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    client_secret: {
        type: DataTypes.STRING,
        allowNull: false,
    }

},
    {
        sequelize,
        modelName: "Society",
    })

Society.sync();

module.exports = Society;