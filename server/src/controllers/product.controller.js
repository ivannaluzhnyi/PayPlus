const Product = require("../models/Product");
const { resCatchError } = require("../helpers/error");

module.exports = {
    getAll: (req, res) => {
        Product.find()
            .then((data) => res.json(data))
            .catch((err) => res.sendStatus(500));
    },

    getOne: (req, res) => {
        Product.findById(req.params.id)
            .then((data) => (data ? res.json(data) : res.sendStatus(404)))
            .catch(() => res.sendStatus(500));
    },

    post: (req, res) => {
        const product = new Product(req.body);
        product
            .save()
            .then((data) => res.status(201).json(data))
            .catch((err) => resCatchError(res, err));
    },
    deletePrd: (req, res) => {
        Product.findByIdAndDelete(req.params.id)
            .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
            .catch((err) => resCatchError(res, err));
    },

    update: (req, res) => {
        Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((data) => (data ? res.json(data) : res.sendStatus(404)))
            .catch((err) => resCatchError(res, err));
    },
};
