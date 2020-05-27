const express = require("express");
const router = express.Router();

import { login } from "../controllers/security.controller";

// POST
router.post("/login", login);

module.exports = router;
