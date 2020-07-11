const schedule = require("node-schedule");

// run every min
// schedule.scheduleJob("* * * * *", function () {
//     console.log(
//         "====================================================================="
//     );
//     console.log("date ==> ", new Date().toTimeString());
//     import("../services/devises-scrapping");
// });

// run everyday at midnight
schedule.scheduleJob("0 0 * * *", () => {
    import("../services/devises-scrapping");
});
