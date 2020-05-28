const express = require("express");
const sequelize = require("./lib/sequelize");
// const User = require("./models/User");
const RouterManager = require("./routes");
const app = express();

const { sendMail } = require("./lib/mailer");

app.use(express.json());

app.get("/hello", (req, res, next) => {
    console.log(req.query);
    res.json({ msg: "Hello" });
});

// Exemple mailer
// sendMail({
//     to: "ivan.naluzhnyi@gmail.com",
//     text: "test my mail service",
//     subject: "testing",
// });

RouterManager(app);

app.listen(5000, () => console.log("listening on port => 5000"));
