const verifyToken = require("../middlewares/verifyToken");

const securityRoutes = require("./security");
const userRoutes = require("./user");
const transactionRoutes = require("./transaction");
const productRoutes = require("./product");
const operationRoutes = require("./operation");

const routerManager = (app) => {
    app.use("/api/", securityRoutes);
    app.use(verifyToken);
    app.use("/api/users", userRoutes);
    app.use("/api/transactions/", transactionRoutes);
    app.use("/api/products/", productRoutes);
    app.use("/api/operations/", operationRoutes);
};

module.exports = routerManager;
