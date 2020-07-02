import { Router } from "express";

import verifyIdRole from "../middlewares/verifyIdRole";
import verifyRole from "../middlewares/verifyRole";

import {
    getAllUsers,
    update,
    getOne,
    getOneWithMerchants,
    generateCredentials,
    resetPasswordAdmin,
    changePassword,
} from "../controllers/user.controller";

import { ROLE } from "../lib/constants";

const router = Router();

router.get("/:id", getOne);
router.get("/merchants/:id", getOneWithMerchants);
router.put("/update/:id", verifyIdRole, update);
router.get("/generate-credentials/:id", verifyIdRole, generateCredentials);
router.put("/change-password/:id", verifyIdRole, changePassword);
router.get("/", verifyRole(ROLE.ADMIN), getAllUsers);
router.get(
    "/reset-password-admin/:id",
    verifyRole(ROLE.ADMIN),
    resetPasswordAdmin
);

export default router;
