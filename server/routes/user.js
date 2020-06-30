const express = require("express");
const verifyIdRole = require("../middlewares/verifyIdRole");

const {
    getAllUsers,
    update,
    getOne,
    getKBIS,
    generateCredentials,
    resetPasswordAdmin,
    changePassword,
    changeUserStatus,
} = require("../controllers/user.controller");
const verifyRole = require("../middlewares/verifyRole");
const { ROLE } = require("../lib/constants");

const router = express.Router();

router.put("/update/:id", verifyIdRole, update);
router.get("/:id", getOne);
router.get("/kbis/:path", getKBIS);
router.get("/generate-credentials/:id", verifyIdRole, generateCredentials);
router.put("/change-password/:id", verifyIdRole, changePassword);
router.get("/", verifyRole(ROLE.ADMIN), getAllUsers);
router.put("/change-user-status/:id", verifyRole(ROLE.ADMIN), changeUserStatus);
router.get(
    "/reset-password-admin/:id",
    verifyRole(ROLE.ADMIN),
    resetPasswordAdmin
);

module.exports = router;
