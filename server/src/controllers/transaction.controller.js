import Transaction from "../models/Transaction";
import Operation from "../models/Operation";
import TransactionMongo from "../models/mongo/Transaction";
import Devises from "../models/mongo/Devises";
import { resCatchError } from "../helpers/error";
import  manageProducts  from "../lib/refund_product"
import {
    OPERATIONS_STATE,
    OPERATIONS_TYPE,
    DEVISE_MAPPING
} from "../lib/constants";

function getAll(req, res) {
    if (req.merchant) {
        Transaction.findAll({ where: { merchant_id: req.merchant.id } })
            .then((data) => res.json(data))
            .catch((err) => res.sendStatus(404));
    } else {
        Transaction.findAll()
            .then((data) => res.json(data))
            .catch((err) => res.sendStatus(404));
    }
}

function getOne(req, res) {
    Transaction.findById(req.params.id)
        .then((data) => (data ? res.json(data) : res.sendStatus(404)))
        .catch((err) => resCatchError(res, err));
}

function post(req, res) {
    const transaction = new Transaction({
        ...req.body,
        merchant_id: req.merchant.id,
    });

    transaction
        .save()
        .then((createdTransaction) => {
            Operation.create({
                transaction_id: createdTransaction.id,
            }).then((createdOperation) => {
                res.status(201).json({
                    ...createdTransaction.toJSON(),
                    payment_url: `${process.env.BASE_URL}/payment`,
                });
            });
        })
        .catch((err) => resCatchError(res, err));
}

function deleteTrns(req, res) {
    Transaction.findByIdAndDelete(req.params.id)
        .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
        .catch((err) => resCatchError(res, err));
}

function update(req, res) {
    Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((data) => (data ? res.json(data) : res.sendStatus(404)))
        .catch((err) => resCatchError(res, err));
}

function getByMerchntsId(req, res) {
    TransactionMongo.find({ "merchant.id": { $in: req.body.merchantsId } })
        .then(async (transactions) => {
            try {
                const devises = await Devises.find();

                console.log("transactions ===> ", transactions);

                const transactionsToSend = transactions.map((trn) => {
                    const transaction = trn.toJSON();

                    const finedDevise = devises.find(({ name, createdAt }) => {
                        const deviseDate = new Date(createdAt);
                        deviseDate.setHours(0, 0, 0, 0);

                        const transactionDate = new Date(transaction.createdAt);
                        transactionDate.setHours(0, 0, 0, 0);

                        return (
                            name ===
                                DEVISE_MAPPING[transaction.merchant.devise] &&
                            deviseDate.getTime() === transactionDate.getTime()
                        );
                    });

                    const deviseRate = parseFloat(
                        finedDevise.rate.replace(",", ".")
                    );

                    const newAmount =
                        parseFloat(transaction.order_amount) * deviseRate;

                    const productsToSend = trn.products.map((prd) => {
                        const newPrice = (
                            parseFloat(prd.product.price) * deviseRate
                        ).toFixed(2);
                        return {
                            ...prd,
                            product: {
                                ...prd.product,
                                price_symbol: String(
                                    `${newPrice}${finedDevise.currency_symbol}`
                                ),
                                price: newPrice,
                            },
                        };
                    });

                    return {
                        ...transaction,
                        order_amount: String(
                            `${newAmount.toFixed(2)}${
                                finedDevise.currency_symbol
                            }`
                        ),
                        products: productsToSend,
                    };
                });

                return transactions
                    ? res.json(transactionsToSend)
                    : res.sendStatus(404);
            } catch (error) {}
        })
        .catch((err) => resCatchError(res, err));
}
function refund(req, res) {
    let list_products_to_refund = req.body;
    Transaction.findOne({order_token: req.params.token})
    .then((data) => {
        console.log("data => ", data.dataValues)
        let list_product = manageProducts( data.dataValues.products, list_products_to_refund)
        Transaction
        .update({ products: list_product['newAllProducts'] }, {
            where: {
                order_token: req.params.token
            },
          }).then(() => {
            
            Operation.create({
                transaction_id: data.dataValues.id,
                state: OPERATIONS_STATE.DONE,
                type: OPERATIONS_TYPE.REFUNDED,
                products: list_product['refundedProducts'],
            }).then((createdOperation) => {
                res.status(201).json({
                    ...createdOperation.toJSON(),
                });
            });
          });
        })
   
}

export { getAll, getOne, post, deleteTrns, update, getByMerchntsId, refund };
