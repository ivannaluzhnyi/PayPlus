const TransactionMongo = require("../mongo/Transaction");
const Transaction = require("../Transaction");
const Operations = require("../Operation");

const denormalize = async (transaction, operation) => {
    await TransactionMongo.deleteOne({ id: transaction.id });
    if (operation !== "delete") {
        transaction = await Transaction.findByPk(transaction.id, {
            include: [Operations],
        });
        const document = new TransactionMongo(transaction.toJSON());
        await document.save();
    }
};

module.exports = denormalize;
// Transaction.addHook("afterCreate", (transaction) => {
//   denormalize(transaction, "create");
// });
// Transaction.addHook("afterUpdate", (transaction) => {
//   denormalize(transaction, "update");
// });
// Transaction.addHook("afterDestroy", (transaction) => {
//   denormalize(transaction, "delete");
// });

// Operations.addHook("afterCreate", (operation) => {
//   denormalize(operation.linked_transaction);
// });
// Operations.addHook("afterUpdate", (operation) => {
//   denormalize(operation.linked_transaction);
// });
// Operations.addHook("afterDestroy", (operation) => {
//   denormalize(operation.linked_transaction);
// });
