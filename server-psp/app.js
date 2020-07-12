const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
    res.json({ message: "🏦 Hello PSP!!! 💰💰💰" });
});

app.post("/checkout", (req, res, next) => {
    console.log("req => ", req.body);
    setTimeout(() => {
        res.sendStatus(204);
    }, 5000);
});

app.listen(3005, () => console.log("Server PSP run on port: 3005"));
