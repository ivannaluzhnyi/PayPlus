const verifyToken = require("../middlewares/verifyToken");

const securityRoutes = require("./security");
const userRoutes = require("./user");
const transactionRoutes = require("./transaction");
const productRoutes = require("./product");
const operationRoutes = require("./operation");

import paymentRoutes from "./payment";

const routerManager = (app) => {
    app.get("/", (req, res, next) => {
        res.json({ message: "🏦 Hello Pay Plus+!!! 💰💰💰" });
    });

    app.use("/payment", paymentRoutes);

    app.use("/api/", securityRoutes);
    app.use("/api/transactions/", transactionRoutes);
    app.use("/api/products/", productRoutes);
    app.use("/api/operations/", operationRoutes);
    app.use(verifyToken);
    app.use("/api/users", userRoutes);
};

export default routerManager;
