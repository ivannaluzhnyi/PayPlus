const mongoose = require("mongoose");
const chalk = require("chalk");

const log = console.log;

mongoose
  .connect(`mongodb://mongo:27018/playPlus+`)
  .then(() => log(chalk.bgGreen("Connected to MongoDB ✅")))
  .catch((e) => console.log(e));

module.exports = mongoose.connection;
