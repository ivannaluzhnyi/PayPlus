import Devises from "../models/mongo/Devises";

function getAll(req, res) {
    Devises.find().then((devises) => {
        res.json(devises);
    });
}
export { getAll };
