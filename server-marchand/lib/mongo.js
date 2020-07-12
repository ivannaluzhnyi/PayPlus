const mongoose = require("mongoose");

mongoose
    .connect(
        `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@mongo:27018`,
        {
            dbName: process.env.MONGODB_DBNAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then((result) => console.log("mongo connected"))
    .catch((err) => console.log(err));

module.exports = mongoose.connection;
