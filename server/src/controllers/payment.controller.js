function get(req, res) {
    // res.render("payment-cancel");
    res.render("payment-form", { priceToPay: 253, devise: "€" });
}

function post(req, res) {
    if (req.body.cancel && Boolean(req.body.cancel)) {
        res.render("payment-cancel");
    }
    console.log("req => ", req.body);
    // res.json(req.body);

    // res.render("payment-form", { priceToPay: 253, devise: "€" });
}

export { get, post };
