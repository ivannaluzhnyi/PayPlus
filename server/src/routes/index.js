import verifyToken from "../middlewares/verifyToken";
import verifySiteMerchand from "../middlewares/verifySiteMerchand";

import securityRoutes from "./security";
import userRoutes from "./user";
import transactionRoutes from "./transaction";
import operationRoutes from "./operation";
import merchantRoutes from "./merchant";
import credentialRoutes from "./credentials";
import paymentRoutes from "./payment";
import dashboardRoutes from "./dashboard"
import deviseRoutes from "./devise";

const routerManager = (app) => {
    app.get("/", (req, res, next) => {
        res.json({ message: "🏦 Hello Pay Plus+!!! 💰💰💰" });
    });
    app.use("/payment", paymentRoutes);

    app.use("/api/", securityRoutes);

    app.use(verifyToken);
    app.use("/api/devises", deviseRoutes);
    app.use("/api/dashboard/", dashboardRoutes)
    app.use("/api/transactions/", transactionRoutes);
    app.use("/api/operations/", operationRoutes);

    app.use(verifySiteMerchand);
    app.use("/api/users/", userRoutes);
    app.use("/api/merchants/", merchantRoutes);
    app.use("/api/credentials/", credentialRoutes);
};

export default routerManager;
