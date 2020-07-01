const express = require("express");
const verifyIdRole = require("../middlewares/verifyIdRole");

const {
    getAllUsers,
    update,
    getOne,
    generateCredentials,
    resetPasswordAdmin,
    changePassword,
} = require("../controllers/user.controller");
const verifyRole = require("../middlewares/verifyRole");
const { ROLE } = require("../lib/constants");

const router = express.Router();

router.put("/update/:id", verifyIdRole, update);
router.get("/:id", getOne);
router.get("/generate-credentials/:id", verifyIdRole, generateCredentials);
router.put("/change-password/:id", verifyIdRole, changePassword);
router.get("/", verifyRole(ROLE.ADMIN), getAllUsers);
router.get(
    "/reset-password-admin/:id",
    verifyRole(ROLE.ADMIN),
    resetPasswordAdmin
);

module.exports = router;
