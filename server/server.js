import compression from "compression";
import spdy from "spdy";
import path from "path";
import fs from "fs";

import expressApp from "./src/app";

// const shouldCompress = (req, res) => {
//     // don't compress responses asking explicitly not
//     if (req.headers["x-no-compression"]) {
//         return false;
//     }

//     // use compression filter function
//     return compression.filter(req, res);
// };

// expressApp.use(compression({ filter: shouldCompress }));

// const options = {
//     key: fs.readFileSync(
//         path.join(__dirname, "/src/config/server/privateKey.key")
//     ),
//     cert: fs.readFileSync(
//         path.join(__dirname, "/src/config/server/certificate.crt")
//     ),
// };

const PORT = 3050;
// start the HTTP/2 server with express
// spdy.createServer(
//     {
//         spdy: {
//             protocols: ["h2", "spdy/3.1", "http/1.1"],
//         },
//     },
//     expressApp
// ).listen(PORT, (error) => {
//     if (error) {
//         console.error(error);
//         return process.exit(1);
//     } else {
//         console.log(`HTTP/2 server listening on port: ${PORT}`);
//     }
// });

expressApp.listen(PORT, (error) => {
    if (error) {
        console.error(error);
        return process.exit(1);
    } else {
        console.log(`HTTP/2 server listening on port: ${PORT}`);
    }
});
