import schedule from "node-schedule";

import { run } from "../services/devises-scrapping";

// run every min
// schedule.scheduleJob("* * * * *", function () {
//     console.log(
//         "====================================================================="
//     );
//     console.log("date ==> ", new Date().toTimeString());
//     run();
// });

// run everyday at midnight
schedule.scheduleJob("0 0 * * *", () => {
    run();
});
