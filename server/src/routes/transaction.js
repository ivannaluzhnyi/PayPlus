const Router = require("express").Router;
const router = Router();

const {
    getAll,
    getOne,
    post,
    deleteTrns,
    update,
    getByMerchntsId,
    refund
} = require("../controllers/transaction.controller");

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", post);
router.delete("/:id", deleteTrns);
router.put("/:id", update);
router.post("/mongo", getByMerchntsId);
router.post("/refund", refund);

module.exports = router;
