import { Router } from "express";

const router = Router();

import { getStatsByMerchant } from "../controllers/statistic.controller";

router.get("/merchant/:id", getStatsByMerchant);

export default router;
