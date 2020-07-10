import Transaction from "../models/Transaction";
import Merchant from "../models/Merchant";
import Operation from "../models/Operation";

import Devises from "../models/mongo/Devises";

import fetch from "node-fetch";

import { OPERATIONS_STATE, DEVISE_MAPPING } from "../lib/constants";

function get(req, res) {
    Transaction.findOne({
        where: {
            order_token: req.query.token,
        },
        include: [Merchant],
    })
        .then((finedTransaction) => {
            if (finedTransaction) {
                console.log("finedTransaction => ", finedTransaction.toJSON());

                //TODO
                res.render("payment-form", {
                    priceToPay: finedTransaction.order_amount,
                    devise: DEVISE_MAPPING[finedTransaction.Merchant.devise],
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
                }).then(async (createdOpeartion) => {
                    console.log(
                        "createdOpeartion => ",
                        createdOpeartion.toJSON()
                    );

                    try {
                        const response = await fetch(
                            "http://localhost:3005/checkout",

                            {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    lol: true,
                                    js: null === true,
                                }),
                            }
                        );

                        console.log("response fetch => ", response);

                        const data = await response.json();

                        console.log("======================================");
                        console.log("data fetch => ", data);
                    } catch (error) {
                        console.log(" catch error => ", error);
                    }
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
