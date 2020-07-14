import { getStatsByMerchantService } from "../services/statisctics";

async function getStatsByMerchant(req, res) {
    try {
        const data = await getStatsByMerchantService(req.params.id);
        res.json(data);
    } catch (error) {
        res.sendStatus(500);
    }
}

export { getStatsByMerchant };
