const mongoose = require("mongoose");
const connect = require("../lib/mongo");

const ProductSchema = new mongoose.Schema({
      name: String,
      description:String,
      price:Number,
      states: String,
      path_image:String
    },
    { collection: "product" }
  );
  
  const Product = connect.model("product", ProductSchema);
  
  module.exports = Product;