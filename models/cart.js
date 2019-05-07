const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const cartSchame = new Schema({
    UserName:{
        type: String,
        ref: "Customer",
        required: true
    },
    ProductId: {
            type: String,
            ref: "Product",
            required:true
    }
});

const Cart = mongoose.model("Cart", cartSchame);
module.exports = Cart;
