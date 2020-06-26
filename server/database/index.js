const sequelize = require("../lib/sequelize");

const { ROLE } = require("../lib/constants");

const User = require("../models/User");
const Devise = require("../models/Devise");
const Operation = require("../models/Operation");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");

User.init(sequelize);
Devise.init(sequelize);
Operation.init(sequelize);
Product.init(sequelize);
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

User.sync({ force: true }).then(() => {
    console.log("====================================");
    console.log("sync =<> User ");
    console.log("====================================");
    // const user = new User({
    //     email: "admin@admin.com",
    //     password: "adminPass",
    //     name: "Pay Plus+",
    //     country: "France",
    //     adress: "36 rue du lol",
    //     zip_code: "75016",
    //     KBIS: "",
    //     url_cancel: null,
    //     url_confirmation: null,
    //     devise: "EURO",
    //     client_token: null,
    //     client_secret: null,
    //     confirmed: true,
    //     role: ROLE.ADMIN,
    //     state: "CONFIRMED",
    // });

    // user.save();
});
Product.sync();
Devise.sync();
Operation.sync();
Transaction.sync();
