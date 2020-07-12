import Operation from "../Operation";
import Transaction from "../Transaction";
import Merchant from "../Merchant";

import TransactionMongo from "../mongo/Transaction";

const denormalize = async (transaction_id, operation) => {
    TransactionMongo.deleteOne({ id: transaction_id }).then(async (res) => {
        console.log("res =<>  ", res);

        if (operation !== "delete") {
            const dTransaction = await Transaction.findByPk(transaction_id, {
                include: [
                    { model: Operation, as: "operations" },
                    { model: Merchant, as: "merchant" },
                ],
            });
    
            const document = new TransactionMongo(dTransaction.toJSON());
            await document.save();
        }
    });

    console.log("=======================================");
    console.log("operation", operation);


};

export default denormalize;
