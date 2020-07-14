import requestMercure from "../lib/request-mercure";
import { getStatsByMerchantService } from "./statisctics";
import { MERCURE_TOPICS } from "../lib/constants";

async function pushStatsByMerchant(id) {
    setTimeout(async () => {
        const stats = await getStatsByMerchantService(id);
        requestMercure(MERCURE_TOPICS.STATS.BY_MERCHANT, stats);
    }, 1000);
}

export { pushStatsByMerchant };
