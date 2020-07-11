import Transaction from "../models/Transaction";
import Merchant from "../models/Merchant";
import Operation from "../models/Operation";

import Devises from "../models/mongo/Devises";

import fetch from "node-fetch";

import {
    OPERATIONS_STATE,
    DEVISE_MAPPING,
    OPERATIONS_TYPE,
} from "../lib/constants";

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
        Transaction.findOne({
            where: {
                order_token: req.body.token,
            },
            include: [Merchant],
        }).then((finedTransaction) => {
            // TODO => https://github.com/sequelize/sequelize/issues/8444
            Operation.destroy({
                where: {
                    transaction_id: finedTransaction.id,
                },
            }).then(() => {
                finedTransaction.destroy({}).then(() => {
                    res.writeHead(301, {
                        Location: finedTransaction.Merchant.url_cancel,
                    });
                    res.end();
                });
            });
        });

        return;
    }

    Transaction.findOne({
        where: {
            order_token: req.body.token,
        },
        include: [Merchant],
    })
        .then((finedTransaction) => {
            if (finedTransaction) {
                Operation.create({
                    transaction_id: finedTransaction.id,
                    state: OPERATIONS_STATE.PROCESSING,
                }).then(async () => {
                    try {
                        const response = await fetch(
                            "http://server-psp:3005/checkout",

                            {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    cardToken: "qsfqskjsfbqjh;skdk:jsqndklmq,d",
                                }),
                            }
                        );

                        if (response.status === 204) {
                            Operation.create({
                                transaction_id: finedTransaction.id,
                                state: OPERATIONS_STATE.DONE,
                                type: OPERATIONS_TYPE.CAPTURE,
                            }).then((newOper) => {
                                res.writeHead(301, {
                                    Location:
                                        finedTransaction.Merchant
                                            .url_confirmation,
                                });
                                res.end();
                            });
                        } else {
                            res.writeHead(301, {
                                Location: finedTransaction.Merchant.url_cancel,
                            });
                            res.end();
                        }
                    } catch (error) {}
                });

                return;
            }
            res.render("payment-cancel");
        })
        .catch((err) => {
            res.render("payment-cancel");
        });
}

export { get, post };
