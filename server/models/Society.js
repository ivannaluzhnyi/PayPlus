const sequelize = require("../lib/sequelize");
const { DataTypes, Model, Sequelize } = require("sequelize");
const Product = require ("./Product");

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
        type: Sequelize.STRING,
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

Society.hasMany(Product);
Product.belongsTo(Society);

Society.sync();

module.exports = Society;