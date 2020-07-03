import { Router } from "express";
import {
    allByMerchantId,
    handleGenerateCredentials,
    deleteCredentials,
} from "../controllers/credentials.controller";

const router = Router();

router.get("/merchant/:id", allByMerchantId);
router.get("/generate/:id", handleGenerateCredentials);
router.delete("/delete", deleteCredentials);

export default router;
