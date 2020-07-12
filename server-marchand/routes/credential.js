const Router = require("express").Router;
const Credential = require("../models/credencial");
const router = Router();

const credentialRoutes = (app, fs) => {
    app.get("/credential", (req, res) => {
        Credential.find({ id: 1 })
            .then((credencial) => {console.log(credencial),
                res.render("credential", {
                    page: "Informations du site HeatSurvie",
                    menuId: "home",
                    credencial: credencial,
                });
            })
            .catch((err) => res.sendStatus(500));
    });

    app.post("/credential", (req, res) => {
        Credential.findOneAndUpdate({ id: 1 }, req.body, { upsert: true })
            .then((credencial) => {
                console.log("credentials => ", credencial);
                res.render("credential", {
                    page: "Informations du site HeatSurvie",
                    menuId: "home",
                    credencial: [credencial]
                });
            })
            .catch((err) => {
                if (err.name === "ValidationError") {
                    res.status(400).json(
                        prettifyErrors(Object.values(err.errors))
                    );
                }
            });
    });

    const prettifyErrors = (errors) => {
        return errors.reduce((acc, item) => {
            acc[item.path] = [...(acc[item.path] || []), item.message];

            return acc;
        }, {});
    };
};
module.exports = credentialRoutes;
