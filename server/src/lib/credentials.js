import { v4 as uuidv4 } from "uuid";
import { createToken } from "./auth";

const generateCredentials = (merchant) =>
    new Promise((resolve, reject) => {
        const client_secret = uuidv4();

        createToken(
            { merchant: merchant.id, state: merchant.state },
            client_secret
        )
            .then((accessToken) =>
                resolve({
                    client_token: accessToken,
                    client_secret,
                })
            )
            .catch(() => reject(null));
    });

export { generateCredentials };
