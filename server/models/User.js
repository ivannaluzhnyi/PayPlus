const { DataTypes, Model } = require("sequelize");
const { hashPassword } = require("../lib/password");

const { ROLE } = require("../lib/constants");

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: { args: true, msg: "Email already exists" },
                    validate: {
                        isEmail: { msg: "Must be a valid email address" },
                        notEmpty: true,
                    },
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                gender: {
                    type: DataTypes.ENUM(["male", "female", "unknown"]),
                    allowNull: false,
                    defaultValue: "unknown",
                },
                firstname: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                lastname: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                role: {
                    allowNull: false,
                    type: DataTypes.ENUM([...Object.keys(ROLE)]),
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
                indexes: [
                    {
                        unique: true,
                        fields: ["email"],
                    },
                ],
            }
        );
    }

    static associate(models) {}
}

module.exports = User;
