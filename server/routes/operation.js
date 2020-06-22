const Router = require("express").Router;
const Operation = require("../models/Operation");
const router = Router();

// get operation
router.get("/", (req, res) => {
    Operation.find()
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

// get operation by id
router.get("/:id", (req, res) => {
    Operation.findById(req.params.id)
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch(() => res.sendStatus(500));
});

// post 
router.post("/", (req, res)=> {
    const operation = new Operation(req.body);
        operation
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


// delete operation
router.delete("/:id", (req, res) => {
    Operation.findByIdAndDelete(req.params.id)
      .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
      .catch(() => res.sendStatus(500));
});

router.put("/:id", (req, res) => {
    Operation.findByIdAndUpdate(req.params.id, req.body, {new: true })
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
