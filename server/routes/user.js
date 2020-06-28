const express = require("express");
const { getAllUsers } = require("../controllers/user.controller");

const router = express.Router();

router.get("/customers", getAllUsers);

module.exports = router;
