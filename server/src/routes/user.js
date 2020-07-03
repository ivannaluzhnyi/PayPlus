import { Router } from "express";

import verifyIdRole from "../middlewares/verifyIdRole";
import verifyRole from "../middlewares/verifyRole";

import {
    getAllUsers,
    update,
    getOne,
    getOneWithMerchants,
    resetPasswordAdmin,
    changePassword,
} from "../controllers/user.controller";

import { ROLE } from "../lib/constants";

const router = Router();

router.get("/:id", getOne);
router.get("/", verifyRole(ROLE.ADMIN), getAllUsers);
router.get("/merchants/:id", getOneWithMerchants);
router.put("/update/:id", verifyIdRole, update);
router.put("/change-password/:id", verifyIdRole, changePassword);
router.get(
    "/reset-password-admin/:id",
    verifyRole(ROLE.ADMIN),
    resetPasswordAdmin
);

export default router;
