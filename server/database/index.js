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

User.sync({}).then(() => {
    User.findOne({ where: { email: "admin@admin.com" } })
        .then((user) => {
            if (user === null) {
                const user = new User({
                    email: "admin@admin.com",
                    password: "adminPass",
                    phone: "0666666666",
                    name: "Pay Plus+",
                    country: "France",
                    address: "36 rue du lol",
                    zip_code: "75016",
                    city: "Paris",
                    KBIS: "",
                    url_cancel: null,
                    url_confirmation: null,
                    devise: "EURO",
                    client_token: null,
                    client_secret: null,
                    role: ROLE.ADMIN,
                    state: "CONFIRMED",
                });
                user.save();
            }
        })
        .catch((e) => {});
});
Product.sync();
Devise.sync();
Operation.sync();
Transaction.sync();
