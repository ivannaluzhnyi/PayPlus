const Operation = require("../models/Operation");
const { resCatchError } = require("../helpers/error");

module.exports = {
    getAll: (req, res) => {
        Operation.find()
            .then((data) => res.json(data))
            .catch((err) => res.sendStatus(500));
    },

    getOne: (req, res) => {
        Operation.findById(req.params.id)
            .then((data) => (data ? res.json(data) : res.sendStatus(404)))
            .catch(() => res.sendStatus(500));
    },

    post: (req, res) => {
        const operation = new Operation(req.body);
        operation
            .save()
            .then((data) => res.status(201).json(data))
            .catch((err) => resCatchError(res, err));
    },
    deleteOpr: (req, res) => {
        Operation.findByIdAndDelete(req.params.id)
            .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
            .catch((err) => resCatchError(res, err));
    },
    update: (req, res) => {
        Operation.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((data) => (data ? res.json(data) : res.sendStatus(404)))
            .catch((err) => resCatchError(res, err));
    },
};
