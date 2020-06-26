const fs = require("fs");
const createToken = require("../lib/auth").createToken;
const { isValidPassword } = require("../lib/password");

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
                                    .then((token) =>
                                        res.json({ ...user.sendUser(), token })
                                    )
                                    .catch(() => res.sendStatus(500));
                            } else {                                res.status(400).json({
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

    register: async (req, res) => {
        try {
            const KBIS = req.body.KBIS;
            const base64Image = KBIS.split(";base64,").pop();
            const type = getFileType(KBIS);

            const user = new User({
                ...req.body,
                KBIS: type,
            });

            user.save()
                .then((data) => {
                    res.status(201).json(data.sendUser());

                    fs.writeFile(
                        "uploads/KBIS/" + `kbis-${data.id}.${type}`,
                        base64Image,
                        { encoding: "base64" },
                        function (err) {
                            console.log("File created");
                        }
                    );
                })
                .catch((err) => {
                    return resCatchError(res, err);
                });
        } catch (err) {
            res.status(500).send(err);
        }
    },
};
