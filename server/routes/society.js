const Router = require("express").Router;
const Society = require("../models/Society");
const router = Router();

// get society
router.get("/", (req, res) => {
    Society.find()
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

// get society by id
router.get("/:id", (req, res) => {
    Society.findById(req.params.id)
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch(() => res.sendStatus(500));
});

// post 
router.post("/society", (req, res)=> {
    const society = new Society(req.body);
        society
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


// delete society
router.delete("/society/:id", (req, res) => {
    Society.findByIdAndDelete(req.params.id)
      .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
      .catch(() => res.sendStatus(500));
});

router.put("/society/:id", (req, res) => {
    Society.findByIdAndUpdate(req.params.id, req.body, {new: true })
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
