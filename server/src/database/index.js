import sequelize from "../lib/sequelize";

import { ROLE } from "../lib/constants";

// import Product from "../models/Product";

import User from "../models/User";
import Merchant from "../models/Merchant";
import Operation from "../models/Operation";
import Credential from "../models/Credential";
import Transaction from "../models/Transaction";

// Product.associate(sequelize.models);
// Product.init(sequelize);

User.init(sequelize);
Merchant.init(sequelize);
Operation.init(sequelize);
Credential.init(sequelize);
Transaction.init(sequelize);

User.associate(sequelize.models);
Merchant.associate(sequelize.models);
Operation.associate(sequelize.models);
Credential.associate(sequelize.models);
Transaction.associate(sequelize.models);

sequelize.sync({}).then(() => {
    User.findOne({ where: { email: "admin@admin.com" } })
        .then((user) => {
            if (user === null) {
                const user = new User({
                    email: "admin@admin.com",
                    password: "adminPass",
                    phone: null,
                    last_name: "Adminovich",
                    first_name: "Admin",
                    role: ROLE.ADMIN,
                });
                user.save();
            }
        })
        .catch((e) => {});
});
