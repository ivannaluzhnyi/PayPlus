import sequelize from "../lib/sequelize";
const { Sequelize, DataTypes, Model } = require("sequelize");

// Generation du model
class User extends Model {}
User.init(
    {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        firstname: DataTypes.STRING,
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: "User",
    }
);

// Schema update
User.sync();

module.exports = User;
