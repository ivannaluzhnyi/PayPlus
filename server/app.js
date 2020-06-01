const express = require("express");
const RouterManager = require("./routes");
const app = express();

require("./database");

const { sendMail } = require("./lib/mailer");

app.use(express.json());

app.get("/", (req, res, next) => {
    res.json({ message: "🏦 Hello Payment!!! 💰💰💰" });
});
    
// Exemple mailer
// sendMail({
//     to: "-----",
//     text: "test my mail service",
//     subject: "testing",
// });

RouterManager(app);

app.listen(5000, () => console.log("listening on port => 5000"));
