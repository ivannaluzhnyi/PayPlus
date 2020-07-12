import Credential from "../models/Credential";
import Merchant from "../models/Merchant";
import { generateCredentials } from "../lib/credentials";

function allByMerchantId(req, res) {
    Credential.findAll({ where: { merchant_id: req.params.id } })
        .then((data) => {
            return data ? res.json(data) : res.sendStatus(404);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
}

function deleteCredentials(req, res) {
    Credential.destroy({ where: { id: req.body.ids } })
        .then((call) => {
            res.sendStatus(200);
        })
        .catch(() => res.sendStatus(500));
}

function handleGenerateCredentials(req, res) {
    Merchant.findByPk(req.params.id)
        .then((currentMerchant) => {
            if (currentMerchant) {
                generateCredentials({
                    ...currentMerchant.toJSON(),
                }).then((credentials) => {
                    Credential.create({
                        merchant_id: currentMerchant.id,
                        ...credentials,
                    }).then((credential) => {
                        return credential
                            ? res.json(credential)
                            : res.sendStatus(404);
                    });
                });
            } else res.sendStatus(404);
        })
        .catch(() => res.sendStatus(500));
}

export { allByMerchantId, handleGenerateCredentials, deleteCredentials };
