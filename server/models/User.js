const { DataTypes, Model } = require("sequelize");
const { hashPassword } = require("../lib/password");

const { ROLE, DEVISE, USER_STATUS } = require("../lib/constants");
const { getFileType } = require("../helpers/functions");

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
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                country: {
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
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                url_cancel: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    validate: {
                        isNull: true,
                        isUrl: { msg: "Must be a valid url" },
                    },
                },
                url_confirmation: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    validate: {
                        isNull: true,
                        isUrl: { msg: "Must be a valid url" },
                    },
                },
                devise: {
                    type: DataTypes.ENUM([...Object.keys(DEVISE)]),
                    defaultValue: DEVISE.EURO,
                },
                client_token: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                client_secret: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                role: {
                    allowNull: false,
                    type: DataTypes.ENUM([...Object.keys(ROLE)]),
                    defaultValue: ROLE.COMPANY,
                },
                state: {
                    type: DataTypes.ENUM([...Object.keys(USER_STATUS)]),
                    defaultValue: USER_STATUS.PENDING,
                },
                phone: {
                    allowNull: false,
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

    // without password
    sendUser = () => ({
        id: this.id,
        name: this.name,
        country: this.country,
        address: this.address,
        zip_code: this.zip_code,
        city: this.city,
        email: this.email,
        KBIS: this.KBIS,
        url_cancel: this.url_cancel,
        url_confirmation: this.url_confirmation,
        devise: this.devise,
        client_token: this.client_token,
        client_secret: this.client_secret,
        role: this.role,
        state: this.state,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    });

    static associate(models) {}
}

module.exports = User;
