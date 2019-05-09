var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport')

var csrfProtection = csrf();
router.use(csrfProtection)

const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
var CustomerModel = require('../models/Customer');
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

router.get('/signup', function(req, res,next){
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
          res.render('sign_up', {title: 'Đăng ký', csrfToken: req.csrfToken(), customersName: arrayList});
        }
      });
    }
  });
});

router.get('/forgotPassword', function(req, res, next){
  res.render('forgot-password', { title: 'Quên mật khầu' });
});

router.get('/account', function(req, res, next){
  res.render('account', { title: 'Tài khoản' });
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/account',
  failureRedirect: '/signup',
  failureFlash: true
}));
module.exports = router;
