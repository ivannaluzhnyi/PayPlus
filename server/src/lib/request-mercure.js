import http from "http";
import querystring from "querystring";
import jwt from "jsonwebtoken";

// ex topic = /demo/test
export default function (
    topic,
    payload,
    conditions = {
        mercure: {
            subscribe: ["*"],
            publish: ["*"],
        },
    }
) {
    const postData = querystring.stringify({
        topic: `http://localhost:3003${topic}`,
        data: JSON.stringify(payload),
    });

    const token = jwt.sign(conditions, process.env.MERCURE_JWT_SECRET);

    const req = http.request(
        {
            hostname: "mercure",
            port: "3003",
            path: "/.well-known/mercure",
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": Buffer.byteLength(postData),
            },
        } /* optional response handler */
    );

    req.write(postData);
    req.end();
}
