const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name:String,
    rate:String,
    country:String,
    currency_symbol:String
});

const Devises = mongoose.model('Devises', Schema);
module.exports = Devises;