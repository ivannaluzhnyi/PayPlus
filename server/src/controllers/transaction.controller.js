import Transaction from "../models/Transaction";
import Operation from "../models/Operation";
import { resCatchError } from "../helpers/error";


import {
    OPERATIONS_STATE,
    OPERATIONS_TYPE,
} from "../lib/constants";


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
        .then((createdTransaction) => {
            Operation.create({
                transaction_id: createdTransaction.id,
            }).then((createdOperation) => {
                res.status(201).json({
                    ...createdTransaction.toJSON(),
                    payment_url: `${process.env.BASE_URL}/payment`,
                });
            });
        })
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

function refund(req, res) {
    const transaction_to_refund = req.body;
    Transaction.findOne({order_token: transaction_to_refund})
        .then((data) => {
            Operation.create({
                transaction_id: data.dataValues.id,
                state: OPERATIONS_STATE.DONE,
                type: OPERATIONS_TYPE.REFUNDED,
            }).then((createdOperation) => {
                res.status(201).json({
                    ...createdOperation.toJSON(),
                });
            });
        })
   
}

export { getAll, getOne, post, deleteTrns, update, refund };
