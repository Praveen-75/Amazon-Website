const mongoose = require("mongoose");

const productModel = mongoose.Schema({
     product_id: {
          type: String,
          unique: true,
     },
     productname: {
          type: String,
          required: true
     },
     price: {
          type: String,
          required: true
     },
     store_id: {
          type: String,
          required: true
     },
     productPic: {
          type: String,
          default: "def.png"
     }
})

module.exports = mongoose.model("card", productModel)