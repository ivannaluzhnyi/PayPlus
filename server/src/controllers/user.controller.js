const fs = require("fs");
const generator = require("generate-password");

const { generateCredentials } = require("../lib/credentials");
const User = require("../models/User");
const { resCatchError } = require("../helpers/error");
const { sendMail } = require("../lib/mailer");
const { isValidPassword } = require("../lib/password");
const { hashPassword } = require("../lib/password");

const { MERCHANT_STATUS } = require("../lib/constants");

module.exports = {
    getAllUsers: (req, res) => {
        User.findAll({ attributes: { exclude: ["password"] } })
            .then((users) => {
                res.json({ customers: users });
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

    getOne: (req, res) => {
        User.findByPk(req.params.id)
            .then((data) => (data ? res.json(data) : res.sendStatus(404)))
            .catch(() => res.sendStatus(500));
    },

    getKBIS: (req, res) => {
        try {
            const contents = fs.readFileSync(
                `./uploads/KBIS/${req.params.path}`,
                {
                    encoding: "base64",
                }
            );
            if (contents) res.json({ base64: contents });
            else res.sendStatus(400);
        } catch (error) {
            res.sendStatus(400);
        }
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
                                    text: `Bonjour ${user.name}. \n\nVoici votre nouveau mot de passe: ${password} \n\n Cordialement.`,
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
    changeUserStatus: (req, res) => {
        if (req.body.state === MERCHANT_STATUS.CONFIRMED) {
            User.findByPk(req.params.id)
                .then((user) => {
                    if (user) {
                        generateCredentials(user).then((credentials) => {
                            User.update(
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
            User.update(
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
    },
};
