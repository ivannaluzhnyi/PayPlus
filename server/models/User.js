const { DataTypes, Model } = require("sequelize");
const { hashPassword } = require("../lib/password");

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
                    type: DataTypes.STRING,
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

    static associate(models) {}
}

module.exports = User;
