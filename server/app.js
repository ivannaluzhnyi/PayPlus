require("dotenv").config();

const express = require("express");
// const sequelize = require("./lib/sequelize");
// const User = require("./models/sequelize/User");
const RouterManager = require("./routes");
const app = express();

app.use(express.json());

app.get("/hello", (req, res, next) => {
    console.log(req.query);
    res.json({ msg: "Hello" });
});

RouterManager(app);

app.listen(5000, () => console.log("listening on port => 5000"));
