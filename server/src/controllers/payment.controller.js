function get(req, res) {
    res.render("payment-form", { priceToPay: 253, devise: "€" });
}

function post(req, res) {
    console.log("req => ", req.body);
    // res.json(req.body);

    res.render("payment-form", { priceToPay: 253, devise: "€" });
}

export { get, post };
