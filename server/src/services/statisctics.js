import TransactionMongo from "../models/mongo/Transaction";
import { prepareStatsToTransactions } from "../helpers/stats";

import { getRandomColor } from "../helpers/functions";
import { ROLE } from "../lib/constants";
import User from "../models/User";
import Merchant from "../models/Merchant";

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
                    number_product_transaction_refund: {
                        $sum: { $sum: "$operations.refund_product_qte" },
                    },
                    number_transaction: { $sum: 1 },
                },
            },

            { $sort: { total: -1 } },
        ]);

        const dataAvarage = await TransactionMongo.aggregate([
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
        ]);

        const list_type = {
            count_canceled: 0,
            count_captured: 0,
        };

        Object.keys(dataAvarage).forEach((element) => {
            list_type.count_canceled += dataAvarage[element].count_canceled;
            list_type.count_captured += dataAvarage[element].count_captured;
        });

        const total_operation =
            list_type.count_canceled + list_type.count_captured;

        const averages_capture = (
            (list_type.count_captured / total_operation) *
            100
        ).toFixed(2);

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

const getStatsDashboardService = async ({ id, role }) => {
    try {
        switch (role) {
            case ROLE.ADMIN:
                break;

            case ROLE.MERCHANT:
                const finedUser = await User.findByPk(id, {
                    include: [{ model: Merchant, as: "merchants" }],
                });

                const finedIds = finedUser.merchants.map(({ id }) => id);

                const AllmarchandByUser = await TransactionMongo.aggregate([
                    {
                        $match: { "merchant.id": { $in: finedIds } },
                    },
                    {
                        $group: {
                            _id: {
                                id: null,
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
                            number_product_transaction_refund: {
                                $sum: {
                                    $sum: "$operations.refund_product_qte",
                                },
                            },
                            number_transaction: { $sum: 1 },
                            total_merchant: { $addToSet: "$merchant.id" },
                        },
                    },
                    {
                        $project: {
                            total_price_transaction: 1,
                            total_product: 1,
                            total_price_transaction_refund: 1,
                            average_price_by_transaction: 1,
                            number_product_transaction_refund: 1,
                            total_price_transaction: 1,
                            number_transaction: 1,
                            total_merchant: { $size: "$total_merchant" },
                        },
                    },
                    { $sort: { total: -1 } },
                ]);

                const AllMarchandByDay = await TransactionMongo.aggregate([
                    {
                        $match: { "merchant.id": { $in: finedIds } },
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
                            number_product_transaction_refund: {
                                $sum: {
                                    $sum: "$operations.refund_product_qte",
                                },
                            },
                            number_transaction: { $sum: 1 },
                            total_merchant: { $addToSet: "$merchant.id" },
                        },
                    },
                    {
                        $project: {
                            total_price_transaction: 1,
                            total_product: 1,
                            total_price_transaction_refund: 1,
                            average_price_by_transaction: 1,
                            number_product_transaction_refund: 1,
                            total_price_transaction: 1,
                            number_transaction: 1,
                            total_merchant: { $size: "$total_merchant" },
                        },
                    },
                    { $sort: { total: -1 } },
                ]);

                const pourcentByMarchand = await TransactionMongo.aggregate([
                    {
                        $match: { "merchant.id": { $in: finedIds } },
                    },
                    {
                        $group: {
                            _id: {
                                id: "$merchant.id",
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
                            number_product_transaction_refund: {
                                $sum: {
                                    $sum: "$operations.refund_product_qte",
                                },
                            },
                            total_merchant: {
                                $addToSet: "$operations.refund_amount",
                            },
                            name: { $last: "$merchant.name" },
                        },
                    },
                    {
                        $project: {
                            total_price_transaction: 1,
                            total_product: 1,
                            total_price_transaction_refund: 1,
                            average_price_by_transaction: 1,
                            number_product_transaction_refund: 1,
                            total_price_transaction: 1,
                            name: 1,
                            total_merchant: { $size: "$total_merchant" },
                        },
                    },
                    { $sort: { total: -1 } },
                ]);

                const list_pourcent = {
                    count_total: 0,
                    pourcent: [],
                    label: [],
                };

                Object.keys(pourcentByMarchand).forEach((element) => {
                    list_pourcent.count_total +=
                        pourcentByMarchand[element].total_price_transaction;
                    list_pourcent.label.push(pourcentByMarchand[element].name);
                });

                Object.keys(pourcentByMarchand).forEach((element) => {
                    list_pourcent.pourcent.push(
                        (pourcentByMarchand[element].total_price_transaction /
                            list_pourcent.count_total) *
                            100
                    );
                });

                const dataToSend = AllmarchandByUser[0] || {
                    total_price_transaction: 0,
                    number_transaction: 0,
                    total_product: 0,
                    total_merchant: 0,
                };

                const prepareResponse = {
                    total_transactions_amount:
                        dataToSend.total_price_transaction,
                    number_transactions: dataToSend.number_transaction,
                    number_products: dataToSend.total_product,
                    userMerchant: {
                        users: 25,
                        merchants: dataToSend.total_merchant,
                    },
                    percentages: {
                        datasets: [
                            {
                                data: list_pourcent.pourcent || [],
                                backgroundColor: list_pourcent.label.map(() =>
                                    getRandomColor()
                                ),
                            },
                        ],
                        labels: list_pourcent.label || [],
                        title: "Pourcentage chiffre d'affaire par marchand",
                    },

                    financial: {
                        transactionAmounts: [],
                        refundAmounts: [],
                        avaragePriceByTransaction: [],
                        dates: [],
                    },
                };

                AllMarchandByDay.forEach((elm) => {
                    prepareResponse.financial.transactionAmounts.push(
                        elm.total_price_transaction
                    );
                    prepareResponse.financial.refundAmounts.push(
                        elm.total_price_transaction_refund
                    );
                    prepareResponse.financial.dates.push(elm._id);
                    prepareResponse.financial.avaragePriceByTransaction.push(
                        elm.average_price_by_transaction.toFixed(2)
                    );
                });

                return prepareResponse;

            default:
                break;
        }
    } catch (error) {
        console.log("error catch ==> ", error);
    }
};
export { getStatsByMerchantService, getStatsDashboardService };
