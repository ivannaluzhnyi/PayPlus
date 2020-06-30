const express = require("express");
const {
    login,
    register,
    loginWithToken,
} = require("../controllers/security.controller");

const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/login/me", verifyToken, loginWithToken);
router.post("/login", login);
router.post("/register", register);

module.exports = router;
