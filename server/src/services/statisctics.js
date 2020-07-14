import TransactionMongo from "../models/mongo/Transaction";
import { prepareStatsToTransactions } from "../helpers/stats";

const getStatsByMerchantService = async (id) => {
    try {
        const byDateStats = await TransactionMongo.aggregate([
            {
                $match: { "merchant.id": Number(id) },
            },

            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%d/%m/%Y",
                            date: "$createdAt",
                        },
                    },
                    total_price_transaction: {
                        $sum: { $toDouble: "$order_amount" },
                    },
                    total_product: {
                        $sum: { $sum: "$products.qte" },
                    },
                    total_price_transaction_refund: {
                        $sum: { $sum: "$operations.refund_amount" },
                    },
                    average_price_by_transaction: {
                        $avg: { $toDouble: "$order_amount" },
                    },
                    number_transaction: { $sum: 1 },
                },
            },

            { $sort: { total: -1 } },
        ]);

        const averages_capture = await TransactionMongo.aggregate([
            {
                $project: {
                    count_canceled: {
                        $size: {
                            $filter: {
                                input: "$operations",
                                as: "item",
                                cond: { $eq: ["$$item.state", "CANCELED"] },
                            },
                        },
                    },
                    count_captured: {
                        $size: {
                            $filter: {
                                input: "$operations",
                                as: "item",
                                cond: { $eq: ["$$item.type", "CAPTURE"] },
                            },
                        },
                    },
                },
            },
        ]).then((data) => {
            const list_type = {
                count_canceled: 0,
                count_captured: 0,
            };

            Object.keys(data).forEach((element) => {
                list_type.count_canceled += data[element].count_canceled;
                list_type.count_captured += data[element].count_captured;
            });

            const total_operation =
                list_type.count_canceled + list_type.count_captured;

            return (list_type.count_captured / total_operation) * 100;
        });

        return {
            radialStat: {
                value: averages_capture,
            },
            ...prepareStatsToTransactions(byDateStats),
        };
    } catch (error) {
        console.log("error => ", error);
    }
};

export { getStatsByMerchantService };
