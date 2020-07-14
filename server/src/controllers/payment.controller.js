import fetch from "node-fetch";

import CryptoJS from "crypto-js";

import { pushStatsByMerchant } from "../services/mercure-push";

import Transaction from "../models/Transaction";
import Merchant from "../models/Merchant";
import Operation from "../models/Operation";

import { OPERATIONS_STATE, OPERATIONS_TYPE } from "../lib/constants";

function get(req, res) {
    Transaction.findOne({
        where: {
            order_token: req.query.token,
        },
        include: [
            { model: Merchant, as: "merchant" },
            {
                model: Operation,
                as: "operations",
            },
        ],
    })
        .then((finedTransaction) => {
            if (
                finedTransaction &&
                !finedTransaction.operations.find(
                    (op) => op.state === OPERATIONS_STATE.DONE
                )
            ) {
                //TODO
                res.render("payment-form", {
                    priceToPay: finedTransaction.order_amount,
                    devise: "€",
                    trnsaction_order_token: req.query.token,
                });
                return;
            }
            res.render("404");
        })
        .catch((err) => {
            console.log("err => ", err);
            res.render("404");
        });
}

function post(req, res) {
    if (req.body.cancel && Boolean(req.body.cancel)) {
        Transaction.findOne({
            where: {
                order_token: req.body.token,
            },
            include: [{ model: Merchant, as: "merchant" }],
        }).then(async (finedTransaction) => {
            // TODO => https://github.com/sequelize/sequelize/issues/8444
            // REMOVE TRANSACTIONS + OPERATIONS
            // Operation.destroy({
            //     individualHooks: true,
            //     where: {
            //         transaction_id: finedTransaction.id,
            //     },
            // }).then(() => {
            //     finedTransaction
            //         .destroy({
            //             individualHooks: true,
            //         })
            //         .then(() => {
            //             res.writeHead(301, {
            //                 Location: finedTransaction.merchant.url_cancel,
            //             });
            //             res.end();
            //         });
            // });

            await Operation.create({
                transaction_id: finedTransaction.id,
                state: OPERATIONS_STATE.CANCELED,
            });

            res.writeHead(301, {
                Location: finedTransaction.merchant.url_cancel,
            });
            res.end();

            await pushStatsByMerchant(finedTransaction.merchant.id);
        });

        return;
    }

    Transaction.findOne({
        where: {
            order_token: req.body.token,
        },
        include: [{ model: Merchant, as: "merchant" }],
    })
        .then((finedTransaction) => {
            if (finedTransaction) {
                Operation.create({
                    transaction_id: finedTransaction.id,
                    state: OPERATIONS_STATE.PROCESSING,
                }).then(async () => {
                    try {
                        const crypted = CryptoJS.AES.encrypt(
                            JSON.stringify({ ...req.body }),
                            process.env.PSP_SECRET
                        ).toString();

                        const response = await fetch(
                            "http://server-psp:3005/checkout",

                            {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    cardToken: crypted,
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
                                        finedTransaction.merchant
                                            .url_confirmation,
                                });
                                res.end();
                            });

                            await pushStatsByMerchant(
                                finedTransaction.merchant.id
                            );
                        } else {
                            res.writeHead(301, {
                                Location: finedTransaction.merchant.url_cancel,
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
