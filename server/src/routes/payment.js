import { Router } from "express";
const router = Router();

import { get, post } from "../controllers/payment.controller";

router.get("/", get);
router.post("/", post);

export default router;
