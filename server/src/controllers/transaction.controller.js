import Transaction from "../models/Transaction";
import { resCatchError } from "../helpers/error";

function getAll(req, res) {
    if (req.merchant) {
        Transaction.findAll({ where: { merchant_id: req.merchant.id } })
            .then((data) => res.json(data))
            .catch((err) => res.sendStatus(404));
    } else {
        Transaction.findAll()
            .then((data) => res.json(data))
            .catch((err) => res.sendStatus(404));
    }
}

function getOne(req, res) {
    Transaction.findById(req.params.id)
        .then((data) => (data ? res.json(data) : res.sendStatus(404)))
        .catch((err) => resCatchError(res, err));
}

function post(req, res) {
    const transaction = new Transaction({
        ...req.body,
        merchant_id: req.merchant.id,
    });

    transaction
        .save()
        .then((data) => res.status(201).json(data))
        .catch((err) => resCatchError(res, err));
}

function deleteTrns(req, res) {
    Transaction.findByIdAndDelete(req.params.id)
        .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
        .catch((err) => resCatchError(res, err));
}

function update(req, res) {
    Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((data) => (data ? res.json(data) : res.sendStatus(404)))
        .catch((err) => resCatchError(res, err));
}

export { getAll, getOne, post, deleteTrns, update };
