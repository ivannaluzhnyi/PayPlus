const Router = require("express").Router;
const Transaction = require("../models/transaction");
const Credential = require("../models/credencial");
const router = Router();
const fetch = require("node-fetch");

const transactionRoutes = (app, fs) => {
    app.get("/transaction", (req, res) => {
        Credential.find({ id: 1 }).then((credentials) => {
            const { client_secret, client_token } = credentials[0];
            fetch(`http://server:3050/api/transactions/`, {
                headers: {
                    Authorization:
                        "Basic " + client_secret + "." + client_token,
                    "content-type": "application/json",
                    accept: "application/json",
                },
            })
                .then((response) => response.json())
                .then((transactions) => {
                    res.render("transaction", {
                        page: " Listes des Transactions",
                        menuId: "home",
                        transactions: transactions,
                    });
                })
                .catch((err) => console.log(err));
        });
    });

    app.get("/invoice", (req, res) => {
        res.render("transaction_invoice", {
            page: "Votre commande",
            menuId: "heatSurvie",
        });
    });

    app.post("/transaction_refund/:id", (req, res) => {
        const id = req.params.id;
        const cart_product = req.body.cart_product;
        Credential.find({ id: 1 }).then((credentials) => {
            const { client_secret, client_token } = credentials[0];
            fetch(`http://server:3050/api/transactions/refund/` + id, {
                headers: {
                    Authorization:
                        "Basic " + client_secret + "." + client_token,
                    "content-type": "application/json",
                    accept: "application/json",
                },
                method: "POST",
                body: req.body.cart_product,
            })
                .then((response) => response.json())
                .then((transactions) => {
                    res.render("index", {
                        page: " Listes des Transactions",
                        menuId: "home",
                        // transactions: transactions,
                    });
                })
                .catch((err) => console.log(err));
        });
    });

    app.get("/canceled", (req, res) => {
        res.render("transaction_cancel", {
            page: "HeatSurvie",
            menuId: "Commande validée !",
        });
    });

    app.delete("/transaction/:id", (req, res) => {
        Transaction.findByIdAndDelete(req.params.id)
            .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
            .catch(() => res.sendStatus(500));
    });
};
module.exports = transactionRoutes;
