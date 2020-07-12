import fs from "fs";
import generator from "generate-password";

import Merchant from "../models/Merchant";
import { getFileType } from "../helpers/functions";

import User from "../models/User";

import { resCatchError } from "../helpers/error";
import { sendMail } from "../lib/mailer";

import { isValidPassword, hashPassword } from "../lib/password";

module.exports = {
    addNewMerchant: (req, res) => {
        try {
            const KBIS = req.body.KBIS;
            const base64Image = KBIS.split(";base64,").pop();
            const type = getFileType(KBIS);

            User.findByPk(req.params.id)
                .then((currentUser) => {
                    Merchant.create({
                        name: req.body.name,
                        country: req.body.country,
                        city: req.body.city,
                        address: req.body.address,
                        zip_code: req.body.zip_code,
                    })
                        .then((createdMerchant) => {
                            currentUser
                                .addMerchant(createdMerchant)
                                .then(() => {
                                    sendMail({
                                        to: currentUser.email,
                                        text: `Bonjour ${currentUser.first_name} ${currentUser.last_name}. \n\n Votre marchand - ${createdMerchant.name} est en attente de validation par un Admin. \n\n Cordialement.`,
                                        subject:
                                            "Inscription Pay Plus+ | Validation",
                                    });

                                    const KBISName = `kbis-merchant-${createdMerchant.id}.${type}`;

                                    createdMerchant
                                        .update({
                                            KBIS: KBISName,
                                        })
                                        .then((updatedMerchant) => {
                                            res.status(201).json(
                                                updatedMerchant
                                            );

                                            const pathWriteFile =
                                                "uploads/KBIS/" + `${KBISName}`;

                                            fs.writeFile(
                                                pathWriteFile,
                                                base64Image,
                                                { encoding: "base64" },
                                                function (err) {
                                                    console.log(
                                                        `File KBIS: ${pathWriteFile} created`
                                                    );
                                                }
                                            );
                                        });
                                });
                        })
                        .catch((err) => {
                            return resCatchError(res, err);
                        });
                })
                .catch((err) => {
                    return resCatchError(res, err);
                });
        } catch (error) {
            console.log("error => ", error);
            res.status(500).send(error);
        }
    },

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
