const verifyToken = require("../middlewares/verifyToken");
const verifyRole = require("../middlewares/verifyRole");

const { ROLE } = require("../lib/constants");

const securityRoutes = require("./security");
const userRoutes = require("./user");

const routerManager = (app) => {
    app.use("/api/", securityRoutes);
    app.use(verifyToken);
    app.use("/users", verifyRole(ROLE.ADMIN), userRoutes);
};

module.exports = routerManager;
