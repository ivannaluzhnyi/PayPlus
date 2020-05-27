const verifyToken = require("../middlewares/verifyToken");

const routerManager = (app) => {
    app.use(verifyToken);
    // app.use("/all", ALL);
};

module.exports = routerManager;
