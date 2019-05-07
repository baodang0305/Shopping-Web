var express = require('express');
var router = express.Router();

// var csrf = require('csurf');
// var csrfProtection = csrf();
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
var CustomerModel = require('../models/Customer');
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

router.get('/login', function(req, res,next){
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully connected");
      const collectionCustomer = client.db("shoppingdb").collection("Customer");
      var arrayList = [];
      var done = 0;
      var cursor = collectionCustomer.find({})
      cursor.forEach(function(CustomerModel) {
        arrayList.push(CustomerModel.UserName);
        done++;
        if (done === 3) {
          res.render('login', {title: 'Đăng nhập và đăng ký', customersName: arrayList});
        }
      });
    }
  });
});

router.get('/forgotPassword', function(req, res, next){
  res.render('forgot-password', { title: 'Quên mật khầu' });
});

router.get('/account', function(req, res,next){
  res.render('account', { title: 'Tài khoản' });
});

router.post('/Customer/signup', function (req, res, next) {
  res.redirect('/');
})
module.exports = router;
