import { Router } from "express";

import {
    login,
    register,
    loginWithToken,
} from "../controllers/security.controller";

import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.get("/login/me", verifyToken, loginWithToken);
router.post("/login", login);
router.post("/register", register);

module.exports = router;
