const { DataTypes, Model } = require("sequelize");

class Devise extends Model {
    static init(sequelize) {
        super.init(
            {
                name: {
                    type: DataTypes.STRING,
                },
                taux: {
                    type: DataTypes.FLOAT,
                },
                taux_inverse: {
                    type: DataTypes.FLOAT,
                },
                Inflation: {
                    type: DataTypes.FLOAT,
                },
            },
            {
                sequelize,
                modelName: "Devise",
            }
        );
    }
}

module.exports = Devise;
