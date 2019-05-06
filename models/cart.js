const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const cartSchame = new Schema({
    UserName:{
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    Id: [{ Id: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required:true
            }
    }]
});

const Cart = mongoose.model("Cart", cartSchame);
module.exports = Cart;
