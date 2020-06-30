const Router = require("express").Router;
const router = Router();

const {
    getAll,
    getOne,
    post,
    deleteOpr,
    update,
} = require("../controllers/operation.controller");

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", post);
router.delete("/:id", deleteOpr);
router.put("/:id", update);

module.exports = router;
