const mongoose = require("mongoose");
const connect = require("../../lib/mongo");
const { ARRAY } = require("sequelize/types");

const TransactionsSchema = new.mongoose.Schema(
  {
    client_first_name: String,
    client_last_name: String,
    delivery_country: String,
    delivery_city: String,
    delivery_address: String,
    delivery_zip_code: String,
    order_amount: String,
    products: Array,
    operarions: Array,
  },
  {
    collection: "Transactions",
  }
);

const Transactions = connect.model("Transactions", TransactionsSchema);

module.exports = Transactions;
