import Credential from "../models/Credential";
import Merchant from "../models/Merchant";
import { ROLE } from "../lib/constants";

const JWTVerifyToken = require("../lib/auth").verifyToken;

const verifyToken = (req, res, next) => {
    let authHeader = req.get("Authorization");

    if (
        !authHeader ||
        !(authHeader.startsWith("Bearer") || authHeader.startsWith("Basic"))
    ) {
        res.sendStatus(401);
        return;
    }

    if (authHeader.startsWith("Basic")) {
        authHeader = authHeader.replace("Basic ", "");

        const client_credentials = authHeader.split(".");

        Credential.findOne({
            where: {
                client_secret: client_credentials[0],
                client_token: client_credentials[1],
            },
            include: [Merchant],
        })
            .then((dbCredentials) => {
                req.merchant = dbCredentials.Merchant;
                req.user = { role: ROLE.MERCHANT };
                next();
            })
            .catch(() => res.sendStatus(401));
    } else {
        authHeader = authHeader.replace("Bearer ", "");

        JWTVerifyToken(authHeader)
            .then((payload) => {
                req.user = payload;
                next();
            })
            .catch(() => res.sendStatus(401));
    }
};

export default verifyToken;
