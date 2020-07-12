const Router = require("express").Router;
const router = Router();
const Credential = require("../models/credencial");

const fetch = require("node-fetch");

const Product = require("../models/product");
const Transaction = require("../models/transaction");
const cartRoutes = (app) => {
    app.get("/cart", (req, res) => {
        Product.find().then((data) =>
            res.render("cart", {
                page: "Valider votre panier",
                menuId: "home",
                products: data,
            })
        );
    });

    app.post("/cart", (req, res) => {
        const cart = JSON.parse(req.body.cart_product);

        const transaction_information = {
            products: [],
            client: {
                client_first_name: "John",
                client_last_name: "Deckard",
                delivery_address: "242 Rue du Faubourg Saint-Antoine",
                delivery_zip_code: "75012",
                delivery_city: "Paris",
                delivery_country: "France",
                order_amount: cart.price,
            },
            credential: [],
        };
        cart.product.forEach((element) => {
            Product.findById(element.id[0]).then((data) => {
                transaction_information.products.push({
                    qte: element.qte,
                    product: data,
                });
            });
        });

        const request = {
            ...transaction_information.client,
            products: transaction_information.products,
        };
        Credential.find({ id: 1 }).then((credentials) => {
            const { client_secret, client_token } = credentials[0];
            fetch(`http://server:3050/api/transactions`, {
                headers: {
                    Authorization:
                        "Basic " + client_secret + "." + client_token,
                    "content-type": "application/json",
                    accept: "application/json",
                },

                body: JSON.stringify(request),
                method: "POST",
            })
                .then((response) => response.json())
                .then((createdTransaction) => {
                    const { payment_url, order_token } = createdTransaction;

                    res.writeHead(301, {
                        Location: `${payment_url}?token=${order_token}`,
                    });
                    res.end();
                })
                .catch((err) => console.log(err));
        });
    });
};

const prettifyErrors = (errors) => {
    return errors.reduce((acc, item) => {
        acc[item.path] = [...(acc[item.path] || []), item.message];

        return acc;
    }, {});
};

module.exports = cartRoutes;
