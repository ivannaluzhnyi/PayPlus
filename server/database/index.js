const sequelize = require("../lib/sequelize");

const User = require("../models/User");

User.init(sequelize);

User.sync({ alter: true });
