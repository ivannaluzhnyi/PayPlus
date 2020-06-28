const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const createToken = require("../lib/auth").createToken;
const { isValidPassword } = require("../lib/password");
const { sendMail } = require("../lib/mailer");

const User = require("../models/User");

const { getFileType } = require("../helpers/functions");
const { resCatchError } = require("../helpers/error");

module.exports = {
    login: (req, res) => {
        User.findOne({ where: { email: req.body.email } })
            .then((user) => {
                if (user) {
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

            const user = new User({
                ...req.body,
                KBIS: KBISName,
            });

            user.save()
                .then((data) => {
                    res.status(201).json(data.sendUser());

                    fs.writeFile(
                        "uploads/KBIS/" + `${KBISName}`,
                        base64Image,
                        { encoding: "base64" },
                        function (err) {
                            console.log("File created");
                        }
                    );

                    sendMail({
                        to: data.email,
                        text: `Bonjour ${data.name}. \n\nMerci pour votre inscription sur la plateforme PayPlus+. Votre compte est en attente de validation par un Admin. \n\n Cordialement.`,
                        subject: "Inscription Pay Plus+ | Validation",
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
