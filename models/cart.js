const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    Username: {type: String, required: true},
    Product: [
                {
                    Id:{type: String},
                    Image: {type: String},
                    Name: {type: String},
                    Cost: {type: Number},
                    Amount: {type: Number},
                    Total: {type: Number}
                }
            ]
},{collection: 'Cart'});

const cart = mongoose.model('cart', cartSchema);
module.exports = cart;
