
import TransactionMongo, { emit } from "../models/mongo/Transaction";
function mainDashboard(req, res) {
    // res.json({ message: "🏦 Hello Pay Plussss+!!! 💰💰💰" })
  
    // Compte le nombre de transaction par marchant
    
    // Group by day - order amount
    // TransactionMongo.aggregate([
    //   { $match: {"merchant.id": 1  } },
    //   { $group:
    //      { 
    //       _id : { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
    //       total: { $sum: {"$toDouble": "$order_amount"} } } },
    //   { $sort: { total: -1 } }
    // ]).then((data) =>res.json(data))
    
    TransactionMongo.aggregate([
      { $match: {"merchant.id": 1  } },
      { $group:
         { 
          _id : { 
            $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } ,
          },
          order_amount: { $sum: {"$toDouble": "$order_amount"} },
          number_product: { $sum: 1 }
        }
      },
          
      { $sort: { total: -1 } }
    ]).then((data) => {
      const areaSats = {
        transactionPerformed: [],
        dates: []
      };
      Object.keys(data).forEach(element => {
        areaSats.transactionPerformed.push(data[element]["_id"])
        areaSats.dates.push(data[element]["order_amount"])
       
      });
      console.log(areaSats)
      res.json(data)

    } )



    
    TransactionMongo.aggregate([
        { $match: { "merchant.id": 1 } },
        { $group: { _id: "$item", total: { $sum: 1 } } },
        
        // { $sort: { total: -1 } }
      ])
            // .then((data) => res.json(data))
            // .catch((err) => res.json(err)) 

    // get REFUNDED
    TransactionMongo.aggregate([
      {
         $project: {
            operations: {
               $filter: {
                  input: "$operations",
                  as: "item",
                  cond: { $eq: [ "$$item.type", "REFUNDED" ] }
               }
            },
         }
      }
   ]).then((data) => console.log("refunded"))

  }
export {mainDashboard}