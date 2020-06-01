const sequelize = require("../lib/sequelize");

const { ROLE } = require("../lib/constants");

const User = require("../models/User");

User.init(sequelize);

console.log("sequelize => ", sequelize);

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
    console.log("sync =<> ");
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
