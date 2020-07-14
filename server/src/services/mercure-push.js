import requestMercure from "../lib/request-mercure";
import {
    getStatsByMerchantService,
    getStatsDashboardService,
} from "./statisctics";
import { MERCURE_TOPICS } from "../lib/constants";

async function pushStatsByMerchant(id) {
    setTimeout(async () => {
        const stats = await getStatsByMerchantService(id);
        requestMercure(MERCURE_TOPICS.STATS.BY_MERCHANT, stats);
    }, 1000);
}

async function pushStatsDashboard(user) {
    setTimeout(async () => {
        const stats = await getStatsDashboardService(user);
        requestMercure(MERCURE_TOPICS.STATS.BY_MERCHANT, stats);
    }, 1000);
}

export { pushStatsByMerchant, pushStatsDashboard };
