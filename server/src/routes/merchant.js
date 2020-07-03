import { Router } from "express";
import verifyRole from "../middlewares/verifyRole";
import {
    getKBIS,
    changeMerchantState,
    all,
    one,
    update,
    addNewUser,
} from "../controllers/merchant.controller";

import { ROLE } from "../lib/constants";

const router = Router();

router.get("/", all);
router.get("/:id", one);
router.put("/update/:id", update);
router.get("/kbis/:path", getKBIS);
router.post("/:id/new-user", addNewUser);
router.put("/change-state/:id", verifyRole(ROLE.ADMIN), changeMerchantState);

export default router;
