const sequelize = require("../lib/sequelize");

const { ROLE } = require("../lib/constants");

const User = require("../models/User");
const Devise = require("../models/Devise");
const Operation = require("../models/Operation");
const Product = require("../models/Product");
const Society = require("../models/Society");
const Transaction = require("../models/Transaction");

User.init(sequelize);
Devise.init(sequelize);
Operation.init(sequelize);
Product.init(sequelize);
Society.init(sequelize);
Transaction.init(sequelize);

// User.bulkCreate(
//     new User({
//         email: "admin@admin.com",
//         password: "adminPass",
//         firstname: "root",
//         lastname: "root",
//         gender: "male",
//         birthday: "2002-05-08",
//         confirmed: true,
//         role: ROLE.ADMIN,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     })
// );

User.sync({}).then(() => {
    console.log("====================================");
    console.log("sync =<> User ");
    console.log("====================================");
    // const user = new User({
    //     email: "admin@admin.com",
    //     password: "adminPass",
    //     firstname: "root",
    //     lastname: "root",
    //     gender: "male",
    //     birthday: "2002-05-08",
    //     confirmed: true,
    //     role: ROLE.ADMIN,
    // });

    // user.save();
});
Product.sync();
Devise.sync();
Operation.sync();
Society.sync();
Transaction.sync();
