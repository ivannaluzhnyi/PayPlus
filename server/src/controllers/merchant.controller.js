import fs from "fs";
import generator from "generate-password";

import Merchant from "../models/Merchant";
import User from "../models/User";
import Credential from "../models/Credential";

import { ROLE, MERCHANT_STATUS } from "../lib/constants";
import { generateCredentials } from "../lib/credentials";
import { resCatchError } from "../helpers/error";
import { sendMail } from "../lib/mailer";

function getKBIS(req, res) {
    try {
        const contents = fs.readFileSync(`./uploads/KBIS/${req.params.path}`, {
            encoding: "base64",
        });
        if (contents) res.json({ base64: contents });
        else res.sendStatus(400);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
}

function changeMerchantState(req, res) {
    if (req.body.state === MERCHANT_STATUS.CONFIRMED) {
        Merchant.findByPk(req.params.id)
            .then((currentMerchant) => {
                if (currentMerchant) {
                    currentMerchant
                        .update({
                            state: MERCHANT_STATUS.CONFIRMED,
                        })
                        .then((newMerchant) => {
                            generateCredentials({
                                ...currentMerchant.toJSON(),
                            }).then((credentials) => {
                                Credential.create({
                                    merchant_id: currentMerchant.id,
                                    ...credentials,
                                });
                            });

                            res.json([newMerchant.toJSON()]);
                        })
                        .catch((err) => {
                            resCatchError(res, err);
                        });
                } else res.sendStatus(404);
            })
            .catch((err) => {
                console.error(err);
                res.sendStatus(500);
            });
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
                where: { id: req.params.id },
            }
        )
            .then(([nbUpdate, data]) => {
                if (nbUpdate === 1) {
                    Credential.destroy({
                        where: {
                            merchant_id: data[0].id,
                        },
                    });
                }

                nbUpdate === 1 ? res.json(data) : res.sendStatus(404);
            })
            .catch((err) => {
                resCatchError(res, err);
            });
    }
}

function all(req, res) {
    switch (req.user.role) {
        case ROLE.ADMIN:
            Merchant.findAll().then((merchants) => {
                res.json({ merchants });
            });
            break;

        case ROLE.MERCHANT:
            User.findByPk(req.user.id, {
                include: [{ model: Merchant, as: "merchants" }],
            }).then((user) => {
                const { merchants } = user;
                res.json({ merchants });
            });
            break;

        default:
            break;
    }
}

function notifications(req, res) {
    Merchant.findAll({ where: { state: MERCHANT_STATUS.PENDING } }).then(
        (merchants) => {
            res.json({ merchants });
        }
    );
}

function one(req, res) {
    Merchant.findByPk(req.params.id, {
        include: [{ model: User, as: "users" }],
    })
        .then((data) => {
            return data ? res.json(data) : res.sendStatus(404);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
}

function addNewUser(req, res) {
    Merchant.findByPk(req.params.id)
        .then((currentMerchant) => {
            const password = generator.generate({
                length: 10,
                numbers: true,
            });
            User.create({
                ...req.body,
                password,
                role: ROLE.MERCHANT,
            })
                .then((createdUser) => {
                    currentMerchant.addUser(createdUser).then(() => {
                        sendMail({
                            to: createdUser.email,
                            text: `Bonjour ${createdUser.first_name} ${createdUser.last_name}. \n\nVoici votre mot de passe pour se connecter à la platforme: ${password} \n\n Cordialement.`,
                            subject: "Pay Plus+ | Création de compte",
                        });
                    });
                    return createdUser
                        ? res.json(createdUser)
                        : res.sendStatus(404);
                })
                .catch((err) => {
                    resCatchError(res, err);
                });
        })
        .catch((err) => {
            res.sendStatus(500);
        });
}

function update(req, res) {
    Merchant.update(req.body, {
        returning: true,
        where: { id: req.params.id },
    })
        .then(([nbUpdate, data]) => {
            return nbUpdate === 1 ? res.json(data) : res.sendStatus(404);
        })
        .catch((err) => {
            resCatchError(res, err);
        });
}

function transactions(req, res) {
    console.log("req.user => ", req.user);
    switch (req.user.role) {
        case ROLE.ADMIN:
            Merchant.findAll({
                where: { state: MERCHANT_STATUS.CONFIRMED },
                attributes: ["name", "id"],
            }).then((merchants) => {
                res.json({ merchants });
            });
            break;

        case ROLE.MERCHANT:
            User.findByPk(req.user.id, {
                include: [
                    {
                        model: Merchant,
                        as: "merchants",
                        where: { state: MERCHANT_STATUS.CONFIRMED },
                        attributes: ["name", "id"],
                    },
                ],
            }).then((user) => {
                const { merchants } = user;
                res.json({ merchants });
            });
            break;

        default:
            break;
    }
}

export {
    getKBIS,
    changeMerchantState,
    all,
    one,
    update,
    addNewUser,
    notifications,
    transactions,
};
