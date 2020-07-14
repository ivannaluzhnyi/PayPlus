import { getStatsByMerchantService, getStatsDashboardService} from "../services/statisctics";

async function getStatsByMerchant(req, res) {
    try {
        const data = await getStatsByMerchantService(req.params.id);
        res.json(data);
    } catch (error) {
        res.sendStatus(500);
    }
}

async function getStatsDashboard(req, res) {

    try {
        console.log("req.user =>", req.user)
        const data = await getStatsDashboardService(req.user);
        res.json(data);
    } catch (error) {
        res.sendStatus(error);
    }
}

export { getStatsByMerchant, getStatsDashboard };
