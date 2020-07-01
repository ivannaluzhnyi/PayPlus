import verifyToken from "../middlewares/verifyToken";

import securityRoutes from "./security";
import userRoutes from "./user";
import transactionRoutes from "./transaction";
import productRoutes from "./product";
import operationRoutes from "./operation";
import merchantRoutes from "./merchant";
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
    app.use("/api/users/", userRoutes);
    app.use("/api/merchants/", merchantRoutes);
};

export default routerManager;
