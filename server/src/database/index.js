import sequelize from "../lib/sequelize";

import { ROLE } from "../lib/constants";

import User from "../models/User";
import Devise from "../models/Devise";
import Product from "../models/Product";
import Merchant from "../models/Merchant";
import Operation from "../models/Operation";
import Credential from "../models/Credential";
import Transaction from "../models/Transaction";

User.init(sequelize);
Merchant.init(sequelize);
Credential.init(sequelize);
Devise.init(sequelize);
Operation.init(sequelize);
Product.init(sequelize);
Transaction.init(sequelize);

User.associate(sequelize.models);
Merchant.associate(sequelize.models);
Credential.associate(sequelize.models);
Transaction.associate(sequelize.models);
Product.associate(sequelize.models);
Operation.associate(sequelize.models);

sequelize.sync({ force: true }).then(() => {
    User.findOne({ where: { email: "admin@admin.com" } })
        .then((user) => {
            if (user === null) {
                const user = new User({
                    email: "admin@admin.com",
                    password: "adminPass",
                    phone: null,
                    role: ROLE.ADMIN,
                });
                user.save();
            }
        })
        .catch((e) => {});
});
