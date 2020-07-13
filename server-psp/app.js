const express = require("express");
const cors = require("cors");

const CryptoJS = require("crypto-js");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
    res.json({ message: "🏦 Hello PSP!!! 💰💰💰" });
});

app.post("/checkout", (req, res, next) => {
    if (req.body.cardToken) {
        try {
            const bytes = CryptoJS.AES.decrypt(
                req.body.cardToken,
                process.env.PSP_SECRET
            );
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            if (
                decryptedData.holderName &&
                decryptedData.cardNumber &&
                decryptedData.cvv
            ) {
                setTimeout(() => {
                    res.sendStatus(204);
                }, 5000);
            } else res.sendStatus(500);
        } catch (error) {}
    }
});

app.listen(3005, () => console.log("Server PSP run on port: 3005"));
