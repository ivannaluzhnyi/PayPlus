const createToken = require("./auth").createToken;
const { v4: uuidv4 } = require("uuid");

const generateCredentials = async (user) =>
    createToken({ id: user.id, role: user.role })
        .then((accessToken) => ({
            client_token: accessToken,
            client_secret: uuidv4(),
        }))
        .catch(() => res.sendStatus(500));

module.exports = {
    generateCredentials,
};
