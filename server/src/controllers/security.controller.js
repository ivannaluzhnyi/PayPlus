import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import Merchant from "../models/Merchant";
import User from "../models/User";

import { createToken } from "../lib/auth";
import { isValidPassword } from "../lib/password";
import { sendMail } from "../lib/mailer";

import { getFileType } from "../helpers/functions";
import { resCatchError } from "../helpers/error";
import { MERCHANT_STATUS, ROLE } from "../lib/constants";

module.exports = {
    login: (req, res) => {
        User.findOne({ where: { email: req.body.email } })
            .then((user) => {
                if (user && user.state !== MERCHANT_STATUS.DISABLED) {
                    isValidPassword(req.body.password, user.password)
                        .then((isPass) => {
                            if (isPass) {
                                createToken({ id: user.id, role: user.role })
                                    .then((accessToken) =>
                                        res.json({
                                            user: { ...user.sendUser() },
                                            accessToken,
                                        })
                                    )
                                    .catch(() => res.sendStatus(500));
                            } else {
                                res.status(400).json({
                                    error: "Invalid credentials",
                                });
                            }
                        })
                        .catch(() => res.sendStatus(500));
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
        const user = await User.findByPk(req.user.id);
        res.status(200).json({ user: user.sendUser() });
    },

    register: async (req, res) => {
        try {
            const KBIS = req.body.KBIS;
            const base64Image = KBIS.split(";base64,").pop();
            const type = getFileType(KBIS);

            const KBISName = `kbis-${uuidv4()}.${type}`;

            console.log("KBISName => ", KBISName);

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
                        KBIS: KBISName,
                    })
                        .then((createdMerchant) => {
                            createdUser
                                .addMerchant(createdMerchant)
                                .then(() => {
                                    res.status(201).json(createdUser);

                                    fs.writeFile(
                                        "uploads/KBIS/" + `${KBISName}`,
                                        base64Image,
                                        { encoding: "base64" },
                                        function (err) {
                                            console.log("File created");
                                        }
                                    );

                                    sendMail({
                                        to: createdUser.email,
                                        text: `Bonjour ${createdUser.name}. \n\nMerci pour votre inscription sur la plateforme PayPlus+. Votre compte est en attente de validation par un Admin. \n\n Cordialement.`,
                                        subject:
                                            "Inscription Pay Plus+ | Validation",
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
