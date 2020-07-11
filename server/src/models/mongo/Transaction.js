const mongoose = require("mongoose");
const connect = require("../../lib/mongo");

const Schema = new mongoose.Schema(
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
  }
);

const Transactions = connect.model("Transactions", Schema);

module.exports = Transactions;
