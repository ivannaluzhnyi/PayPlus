import { Router } from "express";
import { allByMerchantId } from "../controllers/credentials.controller";

const router = Router();

router.get("/merchant/:id", allByMerchantId);

export default router;
