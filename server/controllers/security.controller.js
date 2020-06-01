const createToken = require("../lib/auth").createToken;
const { isValidPassword } = require("../lib/password");
const { ROLE } = require("../lib/constants");
const { isSequelizeError, prettifyErrors } = require("../lib/errorHelpers");

const User = require("../models/User");

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

    register: (req, res) => {
        const user = new User({
            ...req.body,
            role: ROLE.COMPANY,
            confirmed: false,
        });

        user.save()
            .then((data) => res.status(201).json(data))
            .catch((err) => {
                if (isSequelizeError(err.name)) {
                    res.status(400).json(
                        prettifyErrors(Object.values(err.errors))
                    );
                } else {
                    res.sendStatus(500);
                }
            });
    },
};
