var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection)

const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
var CustomerModel = require('../models/customer');
const uri = "mongodb+srv://admin:admin@cluster0-tuy0h.gcp.mongodb.net/test?retryWrites=true";

router.get('/signup', function(req, res,next){
  // MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //     console.log("Successfully connected");
  //     const collectionCustomer = client.db("shoppingdb").collection("Customer");
  //     collectionCustomer.find().toArray(function(err, lcustomer){
  //       console.log(lcustomer);
  //       res.render('sign_up', {title: 'Đăng Ký', customersName: lcustomer});
  //       client.close();
  //     });
  //   }
  // });
  res.render('sign_up', {csrfToken: req.csrfToken()});
});

router.post('/signup', passport.authenticate('local', {
  successRedirect: '/account',
  failureRediect:  '/signup',
  failureFlash: true
}));

router.get('/forgotPassword', function(req, res, next){
  res.render('forgot-password', { title: 'Quên mật khầu' });
});

router.get('/account', function(req, res, next){
  res.render('account', { title: 'Tài khoản' });
});

// router.post('/signup', passport.authenticate('local.signup', {
//   successRedirect: '/account',
//   failureRedirect: '/signup',
//   failureFlash: true
// }));
module.exports = router;
