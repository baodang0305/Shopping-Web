const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customerSchema = new Schema({
    UserName:{
        type: String,
        required: true
    },
    Name:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Adress:{
        type: String,
        required: true
    },
    PhoneNumber:{
        type: Number,
        required: true
    },
    Email:{
        type: String,
        required: true,
        validator: function(value){
            return validator.isEmail(true);
        }
    },
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
