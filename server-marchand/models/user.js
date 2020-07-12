const mongoose = require("mongoose");
const connect = require("../lib/mongo");

const UserSchema = new mongoose.Schema(
  {
    username: String,
    password:String,
  },
  { collection: "user" }
);

const Users = connect.model("user", UserSchema);

module.exports = Users;