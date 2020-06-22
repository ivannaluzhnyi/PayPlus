const express = require("express");
const RouterManager = require("./routes");
const app = express();

const DeviseRouter = require("./routes/devise");
const OperationRouter = require("./routes/operation");
const ProductRouter = require("./routes/product");
const SocietyRouter = require("./routes/society");
const transactionRouter = require("./routes/transaction");

require("./database");

const { sendMail } = require("./lib/mailer");
const Operation = require("./models/Operation");

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

app.use("/Devise", DeviseRouter);
app.use("/Operation", OperationRouter);
app.use("/Product", ProductRouter);
app.use("/Society", SocietyRouter);
app.use("/transaction", transactionRouter);

app.listen(5000, () => console.log("listening on port => 5000"));
