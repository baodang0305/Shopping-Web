var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy

const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
var CustomerModel = require('../models/customer');
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

passport.serializeUser(function(customer, done) {
  done(null, customer.id)
});

passport.deserializeUser(function(id, done) {
  Customer.findById(id, function(err, customer) {
    done(err, customer);
  });
});

passport.use('local', new LocalStrategy({
  usernameField: 'UserName',
  passwordField: 'Password'
}, function(username, password, done) {
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      return done(null, false, {message: 'cannot connnect to the database'});
    }
    else{
      console.log("Successfully connected");
      const collectionCustomer = client.db("shoppingdb").collection("Customer");
      collectionCustomer.findOne({'UserName': username}, function(err, customer){
        if(err) {
          return done(null, false, {message: 'Bị lỗi'});
        }
        if(customer) {
          return done(null, false, {message: 'Tên đăng nhập đã được sử dụng'})
        }
        var newClient = new CustomerModel()
        newClient.UserName = username
        newClient.Password = newClient.encryptPassword(passport)
        newClient.Name = "name"
        newClient.Adress = "address"
        newClient.PhoneNumber = 21324
        newClient.Email = "email"
        collectionCustomer.insert(newClient, function(err, res){
          if (err) {
            return done(null, false, {message: 'Không thể tạo khách hàng mới'})
          }
          return done(null, newClient)
        });
      });
    }
  });
})
)
