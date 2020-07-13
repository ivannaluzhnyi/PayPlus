import { Router } from "express";

const router = Router();

const { mainDashboard } = require("../controllers/dashboard.controller");


router.get("/",  mainDashboard);


export default router;
