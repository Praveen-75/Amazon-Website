const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");


mongoose.connect("mongodb://localhost/amazon");

const userSchema = mongoose.Schema({
     name: String,
     email: {
          type: String,
          unique: true
     },
     username: {
          type: String,
          unique: true
     },
     password: String,
     mobile: String,

     // addCards:[{
     //      type: mongoose.Schema.Types.ObjectId,
     //      ref: "card"
     // }]
});

mongoose.plugin(plm);

module.exports = mongoose.model("user", userSchema);