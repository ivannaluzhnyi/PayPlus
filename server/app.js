const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const RouterManager = require("./routes");
const app = express();

require("./database");

app.use(express.json({ limit: "20mb", extended: true }));
app.use(cors());

app.use(morgan("dev"));

app.get("/", (req, res, next) => {
    res.json({ message: "🏦 Hello Pay Plus+!!! 💰💰💰" });
});

RouterManager(app);

app.listen(3050, () => console.log("listening on port => 5000"));
