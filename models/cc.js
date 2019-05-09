const mongoose = require("mongoose");
var bcrypt =  require('bcrypt-nodejs');
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

customerSchema.methods.encryptPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

customerSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
