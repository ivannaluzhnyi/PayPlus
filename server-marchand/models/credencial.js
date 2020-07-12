const mongoose = require("mongoose");
const connect = require("../lib/mongo");

const credentialSchema = new mongoose.Schema({
    id:Number,
    client_secret:String,
    client_token:String
    },
    { collection: "credential" }
  );
  
  const Credential = connect.model("credential", credentialSchema);
  
  module.exports = Credential;