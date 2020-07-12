const Product = require("../models/product");


exports.findAll = (req, res) => {
    Product.find()
        .then((ss) => ss)
        .catch((err) => res.sendStatus(500));
};


module.exports = Product;