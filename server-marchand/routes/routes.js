const productRoutes = require("./product");
const cartRoutes = require("./cart");
const transactionRoutes = require("./transaction");
const credentialRoutes = require("./credential");
var index = require("./index");

const appRouter = (app, fs) => {
    app.get("/", (req, res) => {
        res.render("index", { page: "HeatSurvie", menuId: "heatSurvie" });
    });
    productRoutes(app, fs);
    cartRoutes(app);
    transactionRoutes(app);
    credentialRoutes(app);
};
module.exports = appRouter;
