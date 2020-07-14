import Operation from "../Operation";
import Transaction from "../Transaction";
import Merchant from "../Merchant";

import TransactionMongo from "../mongo/Transaction";
import { OPERATIONS_TYPE } from "../../lib/constants";

const denormalize = async (transaction_id, operation) => {
    await TransactionMongo.deleteMany({
        id: transaction_id,
    });

    if (operation !== "delete") {
        const dTransaction = await Transaction.findByPk(transaction_id, {
            include: [
                { model: Operation, as: "operations" },
                { model: Merchant, as: "merchant" },
            ],
        });

        const dTransactionJSON = dTransaction.toJSON();

        const document = new TransactionMongo({
            ...dTransactionJSON,
            operations: dTransactionJSON.operations.map((opr) => {
                if (opr.type === OPERATIONS_TYPE.REFUNDED) {
                    const refund_amount = opr.products.reduce(
                        (acc, curr) =>
                            acc +
                            parseFloat(curr.product.price) * Number(curr.qte),
                        0
                    );

                    const refund_product_qte = opr.products.reduce(
                        (acc, curr) =>
                            acc +  Number(curr.qte),
                        0
                    );

                    return {
                        ...opr,
                        refund_amount,
                        refund_product_qte,
                    };
                }

                return opr;
            }),
        });
        await document.save();
    }
};

export default denormalize;
