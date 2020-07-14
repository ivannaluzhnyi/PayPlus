import expressApp from "./src/app";

import requestMercure from "./src/lib/request-mercure";

// exmple request Mercure
requestMercure("/demo/test", { lol: true });

const PORT = 3050;

expressApp.listen(PORT, (error) => {
    if (error) {
        console.error(error);
        return process.exit(1);
    } else {
        console.log(`HTTP/2 server listening on port: ${PORT}`);
    }
});
