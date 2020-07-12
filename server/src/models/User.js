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
                last_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                first_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                role: {
                    allowNull: false,
                    type: DataTypes.ENUM([...Object.keys(ROLE)]),
                    defaultValue: ROLE.MERCHANT,
                },
                phone: {
                    allowNull: true,
                    type: DataTypes.STRING,
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

    static associate(models) {
        this.belongsToMany(models.Merchant, {
            foreignKey: "user_id",
            through: "users_merchants",
            as: "merchants",
        });
    }
}

module.exports = User;
