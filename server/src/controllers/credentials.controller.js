import Credential from "../models/Credential";

function allByMerchantId(req, res) {
    Credential.findAll({ where: { merchant_id: req.params.id } })
        .then((data) => {
            return data ? res.json(data) : res.sendStatus(404);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
}

function create(params) {
    
}

export { allByMerchantId };
