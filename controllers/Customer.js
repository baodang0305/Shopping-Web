var express = require('express');
var router = express.Router();
var Product = require('../models/product');

router.get('/login', function(req, res,next){
  res.render('login', { title: 'Đăng nhập và đăng ký' });
});

router.get('/forgotPassword', function(req, res,next){
  res.render('forgot-password', { title: 'Quên mật khầu' });
});

router.get('/account', function(req, res,next){
  res.render('account', { title: 'Tài khoản' });
});
module.exports = router;
