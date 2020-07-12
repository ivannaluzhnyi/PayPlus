import fs from "fs";

import Merchant from "../models/Merchant";
import User from "../models/User";

import { createToken } from "../lib/auth";
import { isValidPassword } from "../lib/password";
import { sendMail } from "../lib/mailer";

import { getFileType } from "../helpers/functions";
import { resCatchError } from "../helpers/error";
import { ROLE } from "../lib/constants";

module.exports = {
    login: (req, res) => {
        User.findOne({
            where: { email: req.body.email },
        })
            .then((user) => {
                if (user) {
                    isValidPassword(req.body.password, user.password)
                        .then((isPass) => {
                            if (isPass) {
                                createToken({ id: user.id, role: user.role })
                                    .then((accessToken) => {
                                        const preUser = user.toJSON();
                                        delete preUser.password;
                                        res.status(200).json({
                                            user: preUser,
                                            accessToken,
                                        });
                                    })
                                    .catch((err) => {
                                        res.sendStatus(500);
                                    });
                            } else {
                                res.status(400).json({
                                    error: "Invalid credentials",
                                });
                            }
                        })
                        .catch((err) => {
                            res.sendStatus(500);
                        });
                } else
                    res.status(404).json({
                        error: `User with email: ${req.body.email} not found`,
                    });
            })
            .catch((e) => {
                res.status(500).json({ error: e.message });
            });
    },

    loginWithToken: async (req, res) => {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ["password"] },
        });
        res.status(200).json({ user: user.toJSON() });
    },

    register: async (req, res) => {
        try {
            const KBIS = req.body.KBIS;
            const base64Image = KBIS.split(";base64,").pop();
            const type = getFileType(KBIS);

            const user = new User({
                email: req.body.email,
                last_name: req.body.last_name,
                first_name: req.body.first_name,
                password: req.body.password,
                phone: req.body.phone,
                role: ROLE.MERCHANT,
            });

            user.save()
                .then((createdUser) => {
                    Merchant.create({
                        name: req.body.name,
                        country: req.body.country,
                        city: req.body.city,
                        address: req.body.address,
                        zip_code: req.body.zip_code,
                    })
                        .then((createdMerchant) => {
                            createdUser
                                .addMerchant(createdMerchant)
                                .then(() => {
                                    res.status(201).json(createdUser);

                                    sendMail({
                                        to: createdUser.email,
                                        text: `Bonjour ${createdUser.first_name} ${createdUser.last_name}. \n\nMerci pour votre inscription sur la plateforme PayPlus+. Votre marchand - ${createdMerchant.name} est en attente de validation par un Admin. \n\n Cordialement.`,
                                        subject:
                                            "Inscription Pay Plus+ | Validation",
                                    });

                                    const KBISName = `kbis-merchant-${createdMerchant.id}.${type}`;

                                    createdMerchant
                                        .update({
                                            KBIS: KBISName,
                                        })
                                        .then(() => {
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
        } catch (err) {
            res.status(500).send(err);
        }
    },
};
