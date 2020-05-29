const verifyToken = require("../middlewares/verifyToken");
const securityRoutes = require("./security");

const routerManager = (app) => {
    app.use("/", securityRoutes);
    app.use(verifyToken);
};

module.exports = routerManager;
