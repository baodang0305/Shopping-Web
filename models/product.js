const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
    _Id: {
        type: String,
        required: true
    },
    Image:{
        type: String,
        required: true
    },
    Name:{
        type: String,
        required: true
    },
    Category:{
        type: String,
        required: true
    },
    Color:String,
    Cost:{
        type: Number,
        required: true
    },
    SaleOff:Number,
    Amount:{
        type: Number,
        required: true
    },
    Describe: String,
    Size: {
        type: String,
        required: true
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
