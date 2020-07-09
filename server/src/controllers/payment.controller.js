import Transaction from "../models/Transaction";
import Merchant from "../models/Merchant";
import Operation from "../models/Operation";

import { OPERATIONS_STATE } from "../lib/constants";

function get(req, res) {
    Transaction.findOne({
        where: {
            order_token: req.query.token,
        },
        include: [Merchant],
    })
        .then((finedTransaction) => {
            if (finedTransaction) {
                // console.log("finedTransaction => ", finedTransaction);

                //TODO
                res.render("payment-form", {
                    priceToPay: 253,
                    devise: "€",
                    trnsaction_order_token: req.query.token,
                });
                return;
            }
            res.render("404");
        })
        .catch((err) => {
            res.render("404");
        });
}

function post(req, res) {
    if (req.body.cancel && Boolean(req.body.cancel)) {
        res.render("payment-cancel");
        return;
    }
    console.log("req => ", req.body);

    Transaction.findOne({
        where: {
            order_token: req.body.token,
        },
        include: [Merchant],
    })
        .then((finedTransaction) => {
            if (finedTransaction) {
                console.log("finedTransaction => ", finedTransaction.toJSON());

                Operation.create({
                    transaction_id: finedTransaction.id,
                    state: OPERATIONS_STATE.PROCESSING,
                }).then((createdOpeartion) => {
                    console.log(
                        "createdOpeartion => ",
                        createdOpeartion.toJSON()
                    );
                });
            }
            res.render("payment-cancel");
        })
        .catch((err) => {
            res.render("payment-cancel");
        });

    // res.json(req.body);

    // res.render("payment-form", { priceToPay: 253, devise: "€" });
}

export { get, post };
