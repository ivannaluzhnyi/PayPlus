const verifyToken = require("../middlewares/verifyToken");

const securityRoutes = require("./security");
const userRoutes = require("./user");

const routerManager = (app) => {
    app.use("/api/", securityRoutes);
    app.use(verifyToken);
    app.use("/api/users", userRoutes);
};

module.exports = routerManager;
