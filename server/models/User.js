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

                birthday: {
                    type: DataTypes.DATEONLY,
                    allowNull: false,
                    validate: {
                        isDate: true,
                    },
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

    // without password
    sendUser = () => ({
        id: this.id,
        email: this.email,
        gender: this.gender,
        birthday: this.birthday,
        firstname: this.firstname,
        role: this.role,
        confirmed: this.confirmed,
        lastname: this.lastname,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    });

    static associate(models) {}
}

module.exports = User;
