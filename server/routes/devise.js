const Router = require("express").Router;
const Devise = require("../models/Devise");
const router = Router();

// get devise
router.get("/", (req, res) => {
    Devise.find()
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

// get devise by id
router.get("/:id", (req, res) => {
    Devise.findById(req.params.id)
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch(() => res.sendStatus(500));
});

// post 
router.post("/devise", (req, res)=> {
    const devise = new Devise(req.body);
        devise
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


// delete devise
router.delete("/devise/:id", (req, res) => {
    Devise.findByIdAndDelete(req.params.id)
      .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
      .catch(() => res.sendStatus(500));
});

router.put("/devise/:id", (req, res) => {
    Devise.findByIdAndUpdate(req.params.id, req.body, {new: true })
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
