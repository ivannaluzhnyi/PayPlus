const createToken = require("../lib/auth").createToken;

module.exports = {
    login: (req, res) => {
        const { username, password } = req.body;
        if (username === "user" && password === "pass") {
            createToken({ username })
                .then((token) => res.json({ token }))
                .catch(() => res.sendStatus(500));
        } else {
            res.send(400).json({
                username: "Invalid credentials",
                password: "Invalid credentials",
            });
        }
    },
};
