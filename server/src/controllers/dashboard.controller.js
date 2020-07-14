import TransactionMongo, { emit } from "../models/mongo/Transaction";
function mainDashboard(req, res) {
  
  /**
   *  GET ALL FOR ADMIN 
   * Return
   * total_price_transactions
   * total_product
   * total_price_transaction_refund
   * average_price_by_transaction
   * number_transaction
   */
  TransactionMongo.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: "%d/%m/%Y", date: "$createdAt" },
        },
        total_price_transaction: { $sum: { $toDouble: "$order_amount" } },
        total_product: {
          $sum: { $sum: "$products.qte" },
        },
        total_price_transaction_refund: {
          $sum: { $sum: "$operations.refund_amount" },
        },
        average_price_by_transaction: { $avg: { $toDouble: "$order_amount" } },
        number_transaction: { $sum: 1 },
      },
    },

    { $sort: { total: -1 } },
  ])
    .then((data) => {
      const areaSats = {
        transactionPerformed: [],
        dates: [],
      };
      Object.keys(data).forEach((element) => {
        areaSats.transactionPerformed.push(data[element]["_id"]);
        areaSats.dates.push(data[element]["total_price_transaction"]);
      });
      console.log(areaSats);
      res.json(data);
    })
    .catch((err) => console.log(err));
  /**
   * 
   * Return
   * total_price_transactions
   * total_product
   * total_price_transaction_refund
   * average_price_by_transaction
   * number_transaction
   */

  TransactionMongo.aggregate([
    
    {
      $match: { "merchant.id": 1 },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%d/%m/%Y", date: "$createdAt" },
        },
        total_price_transaction: { $sum: { $toDouble: "$order_amount" } },
        total_product: {
          $sum: { $sum: "$products.qte" },
        },
        total_price_transaction_refund: {
          $sum: { $sum: "$operations.refund_amount" },
        },
        average_price_by_transaction: { $avg: { $toDouble: "$order_amount" } },
        number_transaction: { $sum: 1 },
      },
    },

    { $sort: { total: -1 } },
  ])
    .then((data) => {
      const areaSats = {
        transactionPerformed: [],
        dates: [],
      };
      Object.keys(data).forEach((element) => {
        areaSats.transactionPerformed.push(data[element]["_id"]);
        areaSats.dates.push(data[element]["total_price_transaction"]);
      });
      console.log(areaSats);
      // res.json(data);
    })
    .catch((err) => console.log(err));

  // get the averages of product CAPTURE AND refund (demande de remboursement)
  TransactionMongo.aggregate([
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
    console.log(" COUNTING => ", data);
    Object.keys(data).forEach((element) => {
      list_type.count_canceled += data[element]["count_canceled"];
      list_type.count_captured += data[element]["count_captured"];
    });
    // Coucou karl
    const total_operation =  list_type.count_canceled + list_type.count_captured
    const averages_capture = (list_type.count_captured /total_operation) * 100
    console.log(" COUNTING => ", list_type);
    console.log("calcul de merde", averages_capture)
    // res.json(data);
  });
}
export { mainDashboard };
