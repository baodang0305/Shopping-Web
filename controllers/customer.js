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

router.get('/forgotPassword', function(req, res, next){
  res.render('forgot-password', { title: 'Quên mật khầu' });
});

router.get('/account-detail', function(req, res,next){
  let user = req.user;
  res.render('account-detail', {user: user, title: 'Tài khoản' });
});

router.get('/signup', function(req, res,next){
  var messages = req.flash('error');
  res.render('sign-up', {title: 'Đăng ký', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/account-detail',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/',
  failureRedirect: '/signup'
}))

module.exports = router;
