const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mustacheExpress = require("mustache-express");

const RouterManager = require("./routes");
const app = express();

require("./database");
require("./lib/schedule");

// views
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

// dependencies
app.use(express.json({ limit: "20mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));

// routes
RouterManager(app);

app.listen(3050, () => console.log("listening on port => 5000"));
