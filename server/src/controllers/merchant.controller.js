import Merchant from "../models/Merchant";
import User from "../models/User";
import Credential from "../models/Credential";

import { ROLE, MERCHANT_STATUS } from "../lib/constants";

function getKBIS(req, res) {
    try {
        const contents = fs.readFileSync(`./uploads/KBIS/${req.params.path}`, {
            encoding: "base64",
        });
        if (contents) res.json({ base64: contents });
        else res.sendStatus(400);
    } catch (error) {
        res.sendStatus(400);
    }
}

function changeMerchantState(req, res) {
    if (req.body.state === MERCHANT_STATUS.CONFIRMED) {
        Merchant.findByPk(req.params.id)
            .then((user) => {
                if (user) {
                    generateCredentials(user).then((credentials) => {
                        Merchant.update(
                            {
                                ...credentials,
                                state: MERCHANT_STATUS.CONFIRMED,
                            },
                            {
                                returning: true,
                                where: { id: user.id },
                            }
                        )
                            .then(([nbUpdate, data]) =>
                                nbUpdate === 1
                                    ? res.json(data)
                                    : res.sendStatus(404)
                            )
                            .catch((err) => resCatchError(res, err));
                    });
                } else res.sendStatus(404);
            })
            .catch(() => res.sendStatus(500));
    }
    if (
        req.body.state === MERCHANT_STATUS.PENDING ||
        req.body.state === MERCHANT_STATUS.BANNED ||
        req.body.state === MERCHANT_STATUS.DISABLED
    ) {
        Merchant.update(
            {
                state: req.body.state,
                client_token: null,
                client_secret: null,
                url_cancel: null,
                url_confirmation: null,
            },
            {
                returning: true,
                where: { id: user.id },
            }
        )
            .then(([nbUpdate, data]) =>
                nbUpdate === 1 ? res.json(data) : res.sendStatus(404)
            )
            .catch((err) => resCatchError(res, err));
    }
}

function all(req, res) {
    if (req.user.role === ROLE.ADMIN) {
        Merchant.findAll().then((merchants) => {
            res.json({ merchants });
        });
    }
}

function one(req, res) {
    Merchant.findByPk(req.params.id, { include: [User, Credential] })
        .then((data) => (data ? res.json(data) : res.sendStatus(404)))
        .catch(() => res.sendStatus(500));
}

export { getKBIS, changeMerchantState, all, one };
