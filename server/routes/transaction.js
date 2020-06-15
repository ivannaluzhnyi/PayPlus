const Router = require("express").Router;
const Transaction = require("../models/Transaction");
const router = Router();

// get transaction
router.get("/", (req, res) => {
    Transaction.find()
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

// get transaction by id
router.get("/:id", (req, res) => {
    Transaction.findById(req.params.id)
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch(() => res.sendStatus(500));
});

// post 
router.post("/transaction", (req, res)=> {
    const transaction = new Transaction(req.body);
        transaction
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


// delete transaction
router.delete("/transaction/:id", (req, res) => {
    Transaction.findByIdAndDelete(req.params.id)
      .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
      .catch(() => res.sendStatus(500));
});

router.put("/transaction/:id", (req, res) => {
    Transaction.findByIdAndUpdate(req.params.id, req.body, {new: true })
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
