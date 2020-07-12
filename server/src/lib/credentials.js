import { v4 as uuidv4 } from "uuid";

import makeToken from "../lib/makeToken";

const generateCredentials = () =>
    new Promise((resolve, reject) => {
        const client_secret = uuidv4();
        const client_token = makeToken(172);

        resolve({
            client_token,
            client_secret,
        });
    });

export { generateCredentials };
