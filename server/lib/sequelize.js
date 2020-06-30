const Sequelize = require("sequelize");
const chalk = require("chalk");

const log = console.log;

const connection = new Sequelize(process.env.DATABASE_URL);
connection
    .authenticate()
    .then(() => log(chalk.bgGreen("Connected to Postgres ✅")))
    .catch((err) => console.log(err));

module.exports = connection;
