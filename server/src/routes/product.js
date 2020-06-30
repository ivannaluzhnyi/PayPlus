const Router = require("express").Router;
const router = Router();

const {
    getAll,
    getOne,
    post,
    deletePrd,
    update,
} = require("../controllers/product.controller");

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", post);
router.delete("/:id", deletePrd);
router.put("/:id", update);

module.exports = router;
