const sequelize = require("../lib/sequelize");
const { DataTypes, Model } = require("sequelize");

class Devise extends Model { }

Devise.init({
   name: {
       type: DataTypes.STRING,
    },
    taux :  {
        type:DataTypes.FLOAT
    },
    taux_inverse: {
        type:DataTypes.FLOAT
    },  
    Inflation: {
        type:DataTypes.FLOAT
    }
},
    {
        sequelize,
        modelName: "Devise",
    });

    Devise.sync();

module.exports = Devise;