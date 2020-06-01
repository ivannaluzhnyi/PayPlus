const User = require("../models/User");

module.exports = {
    getAllUsers: (req, res) => {
        User.findAll({ attributes: { exclude: ["password"] } })
            .then((users) => {
                res.json(users);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred.",
                });
            });
    },
};
