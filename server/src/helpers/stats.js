const prepareStatsToTransactions = (statsArray) => {
    const prepare = {
        areaSats: {
            transactions: [],
            refunds: [],
            nbrProducts: [],
            dates: [],
        },
        lineStat: {
            transactionAmounts: [],
            refundAmounts: [],
            avaragePriceByTransaction: [],
            dates: [],
        },
    };

    statsArray.forEach((element) => {
        prepare.areaSats.dates.push(element._id);
        prepare.areaSats.transactions.push(element.number_transaction);
        prepare.areaSats.nbrProducts.push(element.total_product);
        prepare.areaSats.refunds.push(element.number_product_transaction_refund || 0);

        prepare.lineStat.dates.push(element._id);
        prepare.lineStat.avaragePriceByTransaction.push(
            element.average_price_by_transaction.toFixed(2)
        );
        prepare.lineStat.transactionAmounts.push(
            element.total_price_transaction.toFixed(2)
        );
        prepare.lineStat.refundAmounts.push(
            element.total_price_transaction_refund.toFixed(2)
        );
    });

    return prepare;
};

export { prepareStatsToTransactions };
