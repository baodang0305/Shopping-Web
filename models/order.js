var ObjectId = require('mongodb').ObjectId;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    Username: {type: String, require: true},
    OrderDate: {type: String, default: new Date().yyyymmdd()},
    Sum: {type: Number, require: true },
    Products: [
      {
          id: {type: ObjectId, require: true},
          amount: {type: Number, require: true}
      }
    ],
    ReceiverPhonenumber: {type: String, require: true},
    ReceiverAddress: {type: String, require: true},
    ReceiverName: {type: String, require: true}
},{collection: 'Order'});

const order = mongoose.model('order', orderSchema);

Date.prototype.yyyymmdd = function() {
  var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
  var dd = this.getDate().toString();

  return [this.getFullYear(), '-', mm.length===2 ? '' : '0', mm, '-', dd.length===2 ? '' : '0', dd].join(''); // padding
};

module.exports = order;
