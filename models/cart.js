<<<<<<< HEAD
const mongoose = require('mongoose');
const Schame = mongoose.Schema;

const cartSchame = new Schame({
    Username: {type: String, required: true},
    Product: [
                {
                    Id:{type: String}, 
                    Image: {type: String}, 
                    Name: {type: String}, 
                    Cost: {type: Number}, 
                    Amount: {type: Number}, 
                    Total: {type: String}
                }
            ]
},{collection: 'Cart'});

const cart = mongoose.model('cart', cartSchame);
module.exports = cart;
=======

module.exports = function CartModel() {
  this.Product
}
>>>>>>> order_feature
