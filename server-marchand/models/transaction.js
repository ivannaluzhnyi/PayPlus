const mongoose = require("mongoose");
const connect = require("../lib/mongo");

const transactionSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    adress:String,
    city:String,
    zip_code:Number,
    state: {
        type: String,
        default: 'pending'
    }

},
    {collection:"transaction"}
);

const Transaction = connect.model("transaction", transactionSchema);

module.exports = Transaction;