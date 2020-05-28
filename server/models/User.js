const sequelize = require("../lib/sequelize");
const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

// export
const Role = {
    ADMIN: "ADMIN",
    MERCHANT: "MERCHANT",
};

class User extends Model {}
User.init(
    {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        firstname: DataTypes.STRING,
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            allowNull: false,
            password: DataTypes.STRING,
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
        hooks: {
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSalt();
                const passwordhash = await bcrypt.hash(user.password, salt);
                user.password = passwordhash;
            },
        },
    }
);

// Schema update
User.sync()
    .then(() =>
        console.log(
            `SEQUELIZE ==> users table has been successfully created, if one doesn't exist`
        )
    )
    .catch((error) => console.log("This error occured", error));

module.exports = User;
