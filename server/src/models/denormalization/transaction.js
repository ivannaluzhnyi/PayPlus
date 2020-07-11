import Operation from "../Operation";
import Transaction from "../Transaction";
import Merchant from "../Merchant";

import TransactionMongo from "../mongo/Transaction";

const denormalize = async (transaction, operation) => {
    await TransactionMongo.deleteOne({ id: transaction.id });
    if (operation !== "delete") {
        transaction = await Transaction.findByPk(transaction.id, {
            include: [Operations, Merchant],
        });
        const document = new TransactionMongo(transaction.toJSON());
        await document.save();
    }
};

Transaction.addHook("afterCreate", (transaction) => {
    denormalize(transaction, "create");
});
Transaction.addHook("afterUpdate", (transaction) => {
    denormalize(transaction, "update");
});
Transaction.addHook("afterDestroy", (transaction) => {
    denormalize(transaction, "delete");
});

Operation.addHook("afterCreate", (operation) => {
    denormalize(operation.linked_transaction, "create");
});
Operation.addHook("afterUpdate", (operation) => {
    denormalize(operation.linked_transaction, "update");
});
Operation.addHook("afterDestroy", (operation) => {
    denormalize(operation.linked_transaction, "delete");
});

export default denormalize;
