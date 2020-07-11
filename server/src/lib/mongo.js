const mongoose = require("mongoose");
const chalk = require("chalk");

const log = console.log;

mongoose
    .connect(
        `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@mongo:27018`,
        {
            dbName: process.env.MONGODB_DBNAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => log(chalk.bgGreen("Connected to MongoDB ✅")))
    .catch((e) => console.log(e));

module.exports = mongoose.connection;
