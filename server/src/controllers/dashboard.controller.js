import TransactionMongo, { emit } from "../models/mongo/Transaction";
function mainDashboard(req, res) {

  TransactionMongo.aggregate([
    {
      $match: { "merchant.id": 1 },
    },
    {$project: {
      operations: {
        $sum:{
          $filter:{
            input:"$operations",
            as:"s",
            cond: { $eq: ["$$s.state", "DONE"] },
          }
        }
      }
    }}

  ]) .then((data) => {
    console.log(data)
  //  res.json(data);
  })

  TransactionMongo.aggregate([
    {
      $match: { "merchant.id": 1 },
    },
    // {
    //   $redact: {
    //     $cond: [
    //       {
    //         $eq: [
    //           {
    //             $let: {
    //               vars: {
    //                 item: { $arrayElemAt: ["$operations", -1] },
    //               },
    //               in: "$$item.type",
    //             },
    //           },
    //           "CAPTURE",
    //         ],
    //       },
    //       "$$KEEP",
    //       "$$PRUNE",
    //     ],
    //   },
    // },
    {
      $group: {
        _id: {
          $dateToString: { format: "%d/%m/%Y", date: "$createdAt" },
        },
        total_price_transaction: { $sum: { $toDouble: "$order_amount" } },
        total_product: { 
          $sum: { $sum: "$products.qte" } 
      },
      total_price_transaction_refund: { 
        $sum: { $sum: "$operations.refund_amount" } 
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


  TransactionMongo.aggregate([
    { $match: { "merchant.id": 1 } },
    { $group: { _id: "$item", total: { $sum: 1 } } },

    // { $sort: { total: -1 } }
  ]);
  // .then((data) => res.json(data))
  // .catch((err) => res.json(err))

  // get REFUNDED
  TransactionMongo.aggregate([
    {
      $match: { "merchant.id": 1 },
    },
    {
      
      $project: {
        count: {
          $size:{
          $filter: {
            input: "$operations",
            as: "item",
            cond: { $eq: ["$$item.state", "CANCELED"] },
          },
        },
      }
      },
    },

  ]).then((data) => {
    console.log(" COUNTING => ", data)
   res.json(data);
  })
}
export { mainDashboard };
