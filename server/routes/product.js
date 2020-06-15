const Router = require("express").Router;
const Product = require("../models/Product");
const router = Router();

// get product
router.get("/", (req, res) => {
    Product.find()
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

// get product by id
router.get("/:id", (req, res) => {
    Product.findById(req.params.id)
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch(() => res.sendStatus(500));
});

// post 
router.post("/product", (req, res)=> {
    const product = new Product(req.body);
        product
        .save()
        .then((data) => res.status(201).json(data))
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).json(prettifyErrors(Object.values(err.errors)));
              } else {
                res.sendStatus(500);
              }
            });
});


// delete product
router.delete("/product/:id", (req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
      .catch(() => res.sendStatus(500));
});

router.put("/product/:id", (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, {new: true })
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch((err) => {
        if (err.name === "ValidationError") {
            res.status(400).json(prettifyErrors(Object.value(err.errors)));
        } else {
            res.sendStatus(500);
        }
    })
})

const prettifyErrors = (errors) => {
    return errors.reduce((acc, item) => {
      acc[item.path] = [...(acc[item.path] || []), item.message];
  
      return acc;
    }, {});
  };

module.exports = router;
