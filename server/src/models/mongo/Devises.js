const mongoose = require("mongoose");
const connect = require("../../lib/mongo");

const Schema = new mongoose.Schema(
  {
    name: String,
    rate: String,
    country: String,
    currency_symbol: String,
  },
  { timestamps: true }
);

const Devises = connect.model("Devises", Schema);
module.exports = Devises;
