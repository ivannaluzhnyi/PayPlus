const express = require("express");
const { login } = require("../controllers/security.controller");

const router = express.Router();

// POST
router.post("/login", login);

module.exports = router;
