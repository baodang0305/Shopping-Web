var mongoose = require('mongoose');

mongoTypes.loadTypes(mongoose, 'email');
mongoose.connect('mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true');
//
// function hash (msg, key) {
//   return crypto.createHmac('sha256', key).update(msg).digest('hex');
// };
//
// function required(val) { return val && val.length; }


var Schema = mongoose.Schema;

var ClientSchema = new Schema(
  {
    username: {type: String, required: true, max: 20, index: { unique: true }},
    password: {type: String, required: true, max: 11},
    address: {type: String, max: 50},
    name: {type: String, max: 50},
    phone: {type: String, max: 11},
    email: {type: String, max: 20}
  }
);

// ClientSchema.path('email').validate(function (v, fn) {
//     User.count({email: v}, function (err, val) {
//         if (err) fn(false);
//         fn(val==0);
//     });
// }, 'Email trùng lặp 

// Phương thức ảo cho URL của tác giả
ClientSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//xuất mô hình
module.exports = mongoose.model('Client', ClientSchema);

// UserSchema.statics.authenticate = function (email, password, fn) {
//     this.findOne({email: email}, function (err, user) {
//         if (!user) return fn(new Error('cannot find user'));
//         if (user.password == hash(password, conf.secret)) return fn(null, user);
//         // Otherwise password is invalid
//         fn(new Error('invalid password'));
//     });
// };
//
// UserSchema.statics.newUser = function (email, password, fn) {
//     var instance = new User();
//     instance.email = email;
//     instance.password = hash(password, conf.secret);
//// XXX:
//     instance.save(function (err) {
//         fn(err, instance);
//     });
// };
//
// UserSchema.statics.resetPassword = function(userId, callback) {
// 	var newPassword = '';
// 	newPassword = newPassword.randomString(6);
//   	var cripto = hash(newPassword, conf.secret);
//   	var data = {}
//   		data.password = cripto;
//
//   	this.update({_id: userId}
//   		, {$set: data}
//   		, {multi:false,safe:true}
//   		, function( error, docs ) {
//   			if (error) {
//   				callback(error);
//   			}
//   			else {
//   				callback(null, newPassword);
//   			}
//   		});
// }
//
// User = mongoose.model('User', UserSchema);
//
// exports.User = User;
