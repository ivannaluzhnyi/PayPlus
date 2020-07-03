import querystring from "querystring";
import http from "http";

// const postData = querystring.stringify({
//     topic: "https://example.com/books/1",
//     data: JSON.stringify({ foo: "updated value" }),
// });

// const req = http.request(
//     {
//         hostname: "localhost",
//         port: "3000",
//         path: "/.well-known/mercure",
//         method: "POST",
//         headers: {
//             // the JWT must have a mercure.publish key containing an array of topic selectors (can contain "*" for all topics, and be empty for public updates)
//             // the JWT key must be shared between the hub and the server
//             "Content-Type": "application/x-www-form-urlencoded",
//             "Content-Length": Buffer.byteLength(postData),
//         },
//     } /* optional response handler */
// );
// req.write(postData);
// req.end();

import expressApp from "./src/app";

const PORT = 3050;

expressApp.listen(PORT, (error) => {
    if (error) {
        console.error(error);
        return process.exit(1);
    } else {
        console.log(`HTTP/2 server listening on port: ${PORT}`);
    }
});
