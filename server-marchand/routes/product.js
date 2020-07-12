const Product = require("../models/product");

const productRoutes = (app, fs) => {
    app.get("/products", (req, res) => {
        Product.find()
            .then((data) => {
                res.render("product", {
                    page: "Nos produits",
                    menuId: "home",
                    products: data,
                });
            })
            .catch((err) => res.sendStatus(500));
    });

    app.get("/products/:id", (req, res) => {
        Product.findById(req.params.id)
            .then((data) => (data ? res.json(data) : res.sendStatus(404)))
            .catch(() => res.sendStatus(500));
    });

    app.post("/products", (req, res) => {
        const product = new Product(req.body);
        product
            .save()
            .then((data) => res.status(201).json(data))
            .catch((err) => {
                if (err.name === "ValidationError") {
                    res.status(400).json(
                        prettifyErrors(Object.values(err.errors))
                    );
                } else {
                    res.sendStatus(500);
                }
            });
    });
    app.put("/products/:id", (req, res) => {
        Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((data) => (data ? res.json(data) : res.sendStatus(404)))
            .catch((err) => {
                if (err.name === "ValidationError") {
                    res.status(400).json(
                        prettifyErrors(Object.values(err.errors))
                    );
                } else {
                    res.sendStatus(500);
                }
            });
    });

    app.delete("/products/:id", (req, res) => {
        Product.findByIdAndDelete(req.params.id)
            .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
            .catch(() => res.sendStatus(500));
    });
};

const prettifyErrors = (errors) => {
    return errors.reduce((acc, item) => {
        acc[item.path] = [...(acc[item.path] || []), item.message];

        return acc;
    }, {});
};
module.exports = productRoutes;
