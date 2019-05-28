const mongoose = require("mongoose");
var bcrypt =  require('bcrypt');
const Schema = mongoose.Schema;
const customerSchema = new Schema({
    Username:{
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
    Address:{
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

// customerSchema.methods.encryptPassword = function(password){
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
// }

// customerSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.Password)
// }

// customerSchema.pre('save', function(next){
//     var cus = this;
//     bcrypt.hash(cus.Password, 10, function(err, hash){
//         if(err){
//             return next(err);
//         }
//         cus.Password = hash;
//         next();
//     });
// });

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;

  
  