const { DataTypes, Model } = require("sequelize");
const { hashPassword } = require("../middlewares/password");

// export
const Role = {
    ADMIN: "ADMIN",
    MERCHANT: "MERCHANT",
};

class User extends Model {
    static init(sequelize) {
        super.init(
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
                        const passwordhash = await hashPassword(user.password);
                        user.password = passwordhash;
                    },
                },
            }
        );
    }
}

// Schema update
User.sync()
    .then(() =>
        console.log(
            `SEQUELIZE ==> users table has been successfully created, if one doesn't exist`
        )
    )
    .catch((error) => console.log("This error occured", error));

module.exports = User;
