const sequelize = require("../lib/sequelize");
const { DataTypes, Model } = require("sequelize");

class Devise extends Model { }

Devise.init({
   name: {
       type: DataTypes.STRING,
    },
    taux :  {
        type:DataTypes.float
    },
    taux_inverse: {
        type:DataTypes.float
    },  
    Inflation: {
        type:DataTypes.float
    }
},
    {
        sequelize,
        modelName: "Devise",
    });

    Devise.sync();

module.exports = Devise;