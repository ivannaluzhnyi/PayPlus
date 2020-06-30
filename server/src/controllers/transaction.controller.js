const Transaction = require("../models/Transaction");
const { resCatchError } = require("../helpers/error");

module.exports = {
    getAll: (req, res) => {
        Transaction.find()
            .then((data) => res.json(data))
            .catch((err) => res.sendStatus(404));
    },

    getOne: (req, res) => {
        Transaction.findById(req.params.id)
            .then((data) => (data ? res.json(data) : res.sendStatus(404)))
            .catch((err) => resCatchError(res, err));
    },

    post: (req, res) => {
        const transaction = new Transaction(req.body);
        transaction
            .save()
            .then((data) => res.status(201).json(data))
            .catch((err) => resCatchError(res, err));
    },
    deleteTrns: (req, res) => {
        Transaction.findByIdAndDelete(req.params.id)
            .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
            .catch((err) => resCatchError(res, err));
    },
    update: (req, res) => {
        Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((data) => (data ? res.json(data) : res.sendStatus(404)))
            .catch((err) => resCatchError(res, err));
    },
};
