import Operation from "../Operation";
import Transaction from "../Transaction";
import Merchant from "../Merchant";

import TransactionMongo from "../mongo/Transaction";

const denormalize = async (transaction, operation) => {
    console.log("denormalize => ", transaction.toJSON());
    await TransactionMongo.deleteOne({ id: transaction.id });

    if (operation !== "delete") {
        const dTransaction = await Transaction.findByPk(transaction.id, {
            include: [Operation, Merchant],
        });

        const document = new TransactionMongo(dTransaction.toJSON());
        await document.save();
    }
};

// Transaction.addHook("afterCreate", (transaction) => {
//     denormalize(transaction, "create");
// });
// Transaction.addHook("afterUpdate", (transaction) => {
//     denormalize(transaction, "update");
// });
// Transaction.addHook("afterDestroy", (transaction) => {
//     denormalize(transaction, "delete");
// });

// Operation.addHook("afterCreate", (operation) => {
//     denormalize(operation.Transaction, "create");
// });
// Operation.addHook("afterUpdate", (operation) => {
//     denormalize(operation.Transaction, "update");
// });
// Operation.addHook("afterDestroy", (operation) => {
//     denormalize(operation.Transaction, "delete");
// });

// Merchant.addHook("afterCreate", (merchant) => {
//     denormalize(merchant.linked_merchant, "create");
// });
// Merchant.addHook("afterUpdate", (merchant) => {
//     denormalize(merchant.linked_merchant, "update");
// });
// Merchant.addHook("afterDestroy", (merchant) => {
//     denormalize(merchant.linked_merchant, "delete");
// });

export default denormalize;
