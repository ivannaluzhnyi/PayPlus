import { Router } from "express";
const router = Router();

const { getAll } = require("../controllers/devise.controller");

router.get("/", getAll);

module.exports = router;

// {
//      _id: 5f0a52831fec3f06c4034b3c,
//      name: 'Dollar canadien',
//      country: 'Canada',
//      rate: '1,5355',
//      currency_symbol: '$',
//      createdAt: 2020-07-12T00:00:03.735Z,
//      updatedAt: 2020-07-12T00:00:03.735Z,
//      __v: 0
//    },
