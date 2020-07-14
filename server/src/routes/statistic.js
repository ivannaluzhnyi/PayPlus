import { Router } from "express";

const router = Router();

import { getStatsByMerchant, getStatsDashboard } from "../controllers/statistic.controller";

router.get("/merchant/:id", getStatsByMerchant);
router.get("/dashboard", getStatsDashboard)
export default router;
