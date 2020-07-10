const schedule = require("node-schedule");
const { exec } = require("child_process");

// console.log("EXEC ==========================================");

import("../services/devises-scrapping");
// exec("yarn devise-scrapping", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }

//     console.log("Scrapping Devise ...");
// });

// run every min
// schedule.scheduleJob("* * * * *", function () {
//     console.log(
//         "====================================================================="
//     );
//     console.log("date ==> ", new Date().toTimeString());

//     exec("yarn devise-scrapping", (error, stdout, stderr) => {
//         if (error) {
//             console.log(`error: ${error.message}`);
//             return;
//         }

//         console.log("Scrapping Devise ...");
//     });
// });

// run everyday at midnight
schedule.scheduleJob("0 0 * * *", () => {});
