const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const RouterManager = require("./routes");
const app = express();

const DeviseRouter = require("./routes/devise");
const OperationRouter = require("./routes/operation");
const ProductRouter = require("./routes/product");
const SocietyRouter = require("./routes/society");
const transactionRouter = require("./routes/transaction");

require("./database");

// const { sendMail } = require("./lib/mailer");
const Operation = require("./models/Operation");

app.use(express.json({ limit: "20mb", extended: true }));
app.use(cors());

app.use(morgan("dev"));

app.get("/", (req, res, next) => {
    res.json({ message: "🏦 Hello Pay Plus+!!! 💰💰💰" });
});

RouterManager(app);

app.use("/movies", DeviseRouter);
app.use("/movies", OperationRouter);
app.use("/movies", ProductRouter);
app.use("/movies", SocietyRouter);
app.use("/movies", transactionRouter);

app.listen(3050, () => console.log("listening on port => 5000"));
