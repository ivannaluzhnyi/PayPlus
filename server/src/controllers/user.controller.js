const generator = require("generate-password");

import Merchant from "../models/Merchant";

const { generateCredentials } = require("../lib/credentials");
const User = require("../models/User");
const { resCatchError } = require("../helpers/error");
const { sendMail } = require("../lib/mailer");
const { isValidPassword } = require("../lib/password");
const { hashPassword } = require("../lib/password");

module.exports = {
    getAllUsers: (req, res) => {
        User.findAll({ attributes: { exclude: ["password"] } })
            .then((users) => {
                res.json({ users: users });
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred.",
                });
            });
    },

    update: (req, res) => {
        User.update(req.body, {
            returning: true,
            where: { id: req.params.id },
        })
            .then(([nbUpdate, data]) =>
                nbUpdate === 1 ? res.json(data) : res.sendStatus(404)
            )
            .catch((err) => resCatchError(res, err));
    },

    getOneWithMerchants: (req, res) => {
        User.findByPk(req.params.id, {
            include: [{ model: Merchant, as: "merchants" }],
            attributes: { exclude: ["password"] },
        })
            .then((data) => (data ? res.json(data) : res.sendStatus(404)))
            .catch((err) => {
                console.error(err);
                res.sendStatus(500);
            });
    },

    getOne: (req, res) => {
        User.findByPk(req.params.id, { attributes: { exclude: ["password"] } })
            .then((data) => (data ? res.json(data) : res.sendStatus(404)))
            .catch(() => res.sendStatus(500));
    },

    generateCredentials: (req, res) => {
        User.findByPk(req.params.id)
            .then((user) => {
                if (user) {
                    generateCredentials(user).then((credential) => {
                        User.update(
                            {
                                ...credential,
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
    },

    resetPasswordAdmin: (req, res) => {
        User.findByPk(req.params.id)
            .then((user) => {
                if (user) {
                    const password = generator.generate({
                        length: 10,
                        numbers: true,
                    });

                    hashPassword(password).then((passwordhash) => {
                        User.update(
                            {
                                password: passwordhash,
                            },
                            {
                                returning: true,
                                where: { id: user.id },
                            }
                        )
                            .then(([nbUpdate, data]) => {
                                sendMail({
                                    to: user.email,
                                    text: `Bonjour ${user.first_name} ${user.last_name}. \n\nVoici votre nouveau mot de passe: ${password} \n\n Cordialement.`,
                                    subject: "Pay Plus+ | Reset Password",
                                });

                                return nbUpdate === 1
                                    ? res.json(data)
                                    : res.sendStatus(404);
                            })
                            .catch((err) => resCatchError(res, err));
                    });
                } else res.sendStatus(404);
            })
            .catch(() => res.sendStatus(500));
    },

    changePassword: (req, res) => {
        User.findByPk(req.params.id)
            .then((user) => {
                if (user) {
                    isValidPassword(req.body.oldPassword, user.password)
                        .then((isPass) => {
                            if (isPass) {
                                hashPassword(req.body.newPassword).then(
                                    (passwordhash) => {
                                        User.update(
                                            {
                                                password: passwordhash,
                                            },
                                            {
                                                returning: true,
                                                where: { id: user.id },
                                            }
                                        )
                                            .then(([nbUpdate, data]) => {
                                                return nbUpdate === 1
                                                    ? res.json(data)
                                                    : res.sendStatus(404);
                                            })
                                            .catch((err) =>
                                                resCatchError(res, err)
                                            );
                                    }
                                );
                            } else {
                                res.status(400).json({
                                    error: "Invalid old password",
                                });
                            }
                        })
                        .catch(() => res.sendStatus(500));
                } else res.sendStatus(404);
            })
            .catch(() => res.sendStatus(500));
    },
};
