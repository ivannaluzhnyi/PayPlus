import { v4 as uuidv4 } from "uuid";

function makeToken(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/*-+$*/!,?^}{|<";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

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
