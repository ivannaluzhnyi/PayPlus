const prepareStatsToTransactions = (statsArray) => {
    console.log("payload => ", statsArray);

    const prepare = {
        areaSats: {
            transactions: [],
            refunds: [],
            dates: [],
        },
        lineStat: {
            transactionAmounts: [],
            refundAmounts: [],
            nbrProducts: [],
            dates: [],
        },
    };

    statsArray.forEach((element) => {
        prepare.areaSats.dates.push(element._id);
        prepare.lineStat.dates.push(element._id);

        prepare.areaSats.transactions.push(element.number_transaction);
        prepare.lineStat.transactionAmounts.push(
            element.total_price_transaction
        );
        prepare.lineStat.nbrProducts.push(element.total_product);
        prepare.lineStat.refundAmounts.push(
            element.total_price_transaction_refund
        );
    });

    return prepare;
};

export { prepareStatsToTransactions };

// _id: '14/07/2020',
//  total_price_transaction: 74,
//  total_product: 2,
//  total_price_transaction_refund: 0,
//  average_price_by_transaction: 74,
//  number_transaction: 1
